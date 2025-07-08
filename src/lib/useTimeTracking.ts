'use client';

import { useEffect, useRef } from 'react';
import { trackTimeOnPage } from './analytics';

interface TimeTrackingOptions {
  page: string;
  intervalMs?: number; // How often to track time (default: 30 seconds)
  trackOnUnload?: boolean; // Track time when user leaves page (default: true)
}

export const useTimeTracking = ({
  page,
  intervalMs = 30000, // 30 seconds
  trackOnUnload = true
}: TimeTrackingOptions) => {
  const startTime = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isVisible = useRef<boolean>(true);

  useEffect(() => {
    startTime.current = Date.now();

    // Track time at intervals
    intervalRef.current = setInterval(() => {
      if (isVisible.current) {
        const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
        trackTimeOnPage(page, timeSpent);
      }
    }, intervalMs);

    // Track visibility changes
    const handleVisibilityChange = () => {
      isVisible.current = !document.hidden;
      if (!document.hidden) {
        // Reset start time when page becomes visible again
        startTime.current = Date.now();
      }
    };

    // Track when user leaves the page
    const handleBeforeUnload = () => {
      if (trackOnUnload && isVisible.current) {
        const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
        trackTimeOnPage(page, timeSpent);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [page, intervalMs, trackOnUnload]);
}; 