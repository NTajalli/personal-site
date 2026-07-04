'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackSectionView, trackSectionDwell } from './analytics';

interface IntersectionTrackingOptions {
  page: string;
  threshold?: number; // Percentage of element that needs to be visible (default: 0.1)
  rootMargin?: string; // Margin around root (default: '0px')
  trackOnce?: boolean; // Only track the first time element is visible (default: true)
  minDwellMs?: number; // Minimum visible time before a dwell event is reported (default: 1000ms)
}

export const useIntersectionTracking = ({
  page,
  threshold = 0.1,
  rootMargin = '0px',
  trackOnce = true,
  minDwellMs = 1000
}: IntersectionTrackingOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const trackedElements = useRef<Set<string>>(new Set());
  const visibleSince = useRef<Map<string, number>>(new Map());

  const trackElement = useCallback((elementName: string) => {
    if (trackOnce && trackedElements.current.has(elementName)) {
      return;
    }
    trackedElements.current.add(elementName);
    trackSectionView(elementName, page);
  }, [page, trackOnce]);

  const reportDwell = useCallback((elementName: string, startedAt: number) => {
    const elapsedMs = Date.now() - startedAt;
    if (elapsedMs >= minDwellMs) {
      trackSectionDwell(elementName, page, Math.round(elapsedMs / 1000));
    }
  }, [page, minDwellMs]);

  useEffect(() => {
    const visibleSinceMap = visibleSince.current;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementName = entry.target.getAttribute('data-track-section') || 'unknown';
          if (entry.isIntersecting) {
            trackElement(elementName);
            if (!visibleSinceMap.has(elementName)) {
              visibleSinceMap.set(elementName, Date.now());
            }
          } else {
            const startedAt = visibleSinceMap.get(elementName);
            if (startedAt !== undefined) {
              visibleSinceMap.delete(elementName);
              reportDwell(elementName, startedAt);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    return () => {
      // Flush dwell time for any sections still in view when this unmounts (e.g. route change)
      visibleSinceMap.forEach((startedAt, elementName) => {
        reportDwell(elementName, startedAt);
      });
      visibleSinceMap.clear();
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, trackElement, reportDwell]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      visibleSince.current.forEach((startedAt, elementName) => {
        reportDwell(elementName, startedAt);
      });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [reportDwell]);

  const observe = useCallback((element: HTMLElement, sectionName: string) => {
    if (observerRef.current && element) {
      element.setAttribute('data-track-section', sectionName);
      observerRef.current.observe(element);
    }
  }, []);

  const unobserve = useCallback((element: HTMLElement) => {
    if (observerRef.current && element) {
      observerRef.current.unobserve(element);
    }
  }, []);

  return { observe, unobserve };
}; 