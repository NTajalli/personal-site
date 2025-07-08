'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackSectionView } from './analytics';

interface IntersectionTrackingOptions {
  page: string;
  threshold?: number; // Percentage of element that needs to be visible (default: 0.1)
  rootMargin?: string; // Margin around root (default: '0px')
  trackOnce?: boolean; // Only track the first time element is visible (default: true)
}

export const useIntersectionTracking = ({
  page,
  threshold = 0.1,
  rootMargin = '0px',
  trackOnce = true
}: IntersectionTrackingOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const trackedElements = useRef<Set<string>>(new Set());

  const trackElement = useCallback((elementName: string) => {
    if (trackOnce && trackedElements.current.has(elementName)) {
      return;
    }
    trackedElements.current.add(elementName);
    trackSectionView(elementName, page);
  }, [page, trackOnce]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementName = entry.target.getAttribute('data-track-section') || 'unknown';
            trackElement(elementName);
          }
        });
      },
      { threshold, rootMargin }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, trackElement]);

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