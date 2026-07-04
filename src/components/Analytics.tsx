'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GA_TRACKING_ID, isGAEnabled, trackPageView, trackOutboundReturn } from '@/lib/analytics';

// A tab-hide within this window of an outbound click is assumed to be caused by that click
const OUTBOUND_CLICK_ATTRIBUTION_WINDOW_MS = 2000;

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on mount and whenever the pathname changes
    if (pathname && isGAEnabled) {
      trackPageView(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isGAEnabled) return;

    let lastOutboundClick: { label: string; timestamp: number } | null = null;
    let awaySince: number | null = null;

    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest?.('a[target="_blank"]');
      if (anchor) {
        lastOutboundClick = {
          label: anchor.getAttribute('href') || anchor.textContent || 'unknown',
          timestamp: Date.now(),
        };
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (lastOutboundClick && Date.now() - lastOutboundClick.timestamp < OUTBOUND_CLICK_ATTRIBUTION_WINDOW_MS) {
          awaySince = Date.now();
        }
      } else if (awaySince !== null && lastOutboundClick) {
        const awaySeconds = Math.round((Date.now() - awaySince) / 1000);
        trackOutboundReturn(lastOutboundClick.label, awaySeconds);
        awaySince = null;
        lastOutboundClick = null;
      }
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Don't render anything if GA is not enabled
  if (!isGAEnabled) return null;

  return (
    <>
      {/* Google Analytics Script */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
    </>
  );
} 