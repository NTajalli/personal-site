'use client';

import { useEffect, useRef } from 'react';
import { trackScrollDepth, trackScrollMilestone } from './analytics';

interface ScrollTrackingOptions {
  page: string;
  thresholds?: number[]; // Percentage thresholds to track (default: [25, 50, 75, 100])
  debounceMs?: number; // Debounce scroll events (default: 100ms)
}

export const useScrollTracking = ({
  page,
  thresholds = [25, 50, 75, 100],
  debounceMs = 100
}: ScrollTrackingOptions) => {
  const trackedThresholds = useRef<Set<number>>(new Set());
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

        // Track scroll depth for each threshold
        thresholds.forEach(threshold => {
          if (scrollPercentage >= threshold && !trackedThresholds.current.has(threshold)) {
            trackedThresholds.current.add(threshold);
            trackScrollDepth(page, threshold);
            trackScrollMilestone(page, `${threshold}%`);
          }
        });

        // Track 100% completion
        if (scrollPercentage >= 100 && !trackedThresholds.current.has(100)) {
          trackedThresholds.current.add(100);
          trackScrollMilestone(page, 'page_complete');
        }
      }, debounceMs);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [page, thresholds, debounceMs]);

  // Reset tracking when page changes
  useEffect(() => {
    trackedThresholds.current.clear();
  }, [page]);
}; 