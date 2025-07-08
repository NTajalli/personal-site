'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GA_TRACKING_ID, isGAEnabled, initGA, trackPageView } from '@/lib/analytics';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Google Analytics when component mounts
    if (isGAEnabled) {
      initGA();
    }
  }, []);

  useEffect(() => {
    // Track page view when pathname changes
    if (pathname && isGAEnabled) {
      trackPageView(pathname);
    }
  }, [pathname]);

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
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
} 