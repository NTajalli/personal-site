declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export const GA_TRACKING_ID = "G-ECECEBQKW1";

// Check if we have a tracking ID
export const isGAEnabled = !!GA_TRACKING_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!isGAEnabled) return;

  // Configure gtag
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (!isGAEnabled) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!isGAEnabled) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Common event tracking functions
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('click', 'button', `${buttonName} - ${location}`);
};

export const trackPageVisit = (pageName: string) => {
  trackEvent('page_view', 'navigation', pageName);
};

export const trackDownload = (fileName: string) => {
  trackEvent('download', 'file', fileName);
};

export const trackExternalLink = (url: string) => {
  trackEvent('click', 'external_link', url);
}; 