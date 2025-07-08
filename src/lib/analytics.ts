declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
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

// NAVIGATION TRACKING
export const trackNavigation = (destination: string, source: string) => {
  trackEvent('navigate', 'navigation', `${source} -> ${destination}`);
};

export const trackMobileMenuToggle = (action: 'open' | 'close') => {
  trackEvent(action, 'mobile_menu', 'hamburger_menu');
};

// WORK EXPERIENCE TRACKING
export const trackWorkExperienceView = (company: string, position: string) => {
  trackEvent('view', 'work_experience', `${company} - ${position}`);
};

export const trackWorkExperienceClick = (company: string, position: string) => {
  trackEvent('click', 'work_experience', `${company} - ${position}`);
};

// PROJECT TRACKING
export const trackProjectView = (projectName: string, category: string) => {
  trackEvent('view', 'project', `${projectName} - ${category}`);
};

export const trackProjectDemo = (projectName: string, demoUrl: string) => {
  trackEvent('click', 'project_demo', projectName, 1);
  trackEvent('click', 'external_link', demoUrl);
};

export const trackProjectCode = (projectName: string, githubUrl: string) => {
  trackEvent('click', 'project_code', projectName, 1);
  trackEvent('click', 'external_link', githubUrl);
};

export const trackTechStackClick = (technology: string, projectName: string) => {
  trackEvent('click', 'tech_stack', `${technology} - ${projectName}`);
};

// CONTACT FORM TRACKING
export const trackFormStart = (formType: string) => {
  trackEvent('start', 'form', formType);
};

export const trackFormFieldFocus = (fieldName: string, formType: string) => {
  trackEvent('focus', 'form_field', `${fieldName} - ${formType}`);
};

export const trackFormSubmit = (formType: string) => {
  trackEvent('submit', 'form', formType, 1);
};

export const trackFormError = (fieldName: string, errorType: string) => {
  trackEvent('error', 'form_validation', `${fieldName} - ${errorType}`);
};

// SOCIAL MEDIA TRACKING
export const trackSocialClick = (platform: string, location: string) => {
  trackEvent('click', 'social_media', `${platform} - ${location}`);
};

export const trackLinkedInClick = (location: string) => {
  trackSocialClick('LinkedIn', location);
};

export const trackGitHubClick = (location: string) => {
  trackSocialClick('GitHub', location);
};

// CTA BUTTON TRACKING
export const trackCTAClick = (buttonText: string, location: string, destination: string) => {
  trackEvent('click', 'cta_button', `${buttonText} - ${location} -> ${destination}`);
};

// SKILL TRACKING
export const trackSkillView = (skillName: string, skillLevel: number) => {
  trackEvent('view', 'skill', skillName, skillLevel);
};

export const trackSkillCategoryView = (categoryName: string, skillCount: number) => {
  trackEvent('view', 'skill_category', categoryName, skillCount);
};

export const trackSkillHover = (skillName: string) => {
  trackEvent('hover', 'skill', skillName);
};

// CONTACT METHOD TRACKING
export const trackContactMethod = (method: string, location: string) => {
  trackEvent('click', 'contact_method', `${method} - ${location}`);
};

export const trackEmailClick = (location: string) => {
  trackContactMethod('email', location);
};

export const trackPhoneClick = (location: string) => {
  trackContactMethod('phone', location);
};

// SCROLL DEPTH TRACKING
export const trackScrollDepth = (page: string, depth: number) => {
  trackEvent('scroll_depth', 'engagement', page, depth);
};

export const trackScrollMilestone = (page: string, milestone: string) => {
  trackEvent('scroll_milestone', 'engagement', `${page} - ${milestone}`);
};

// TIME ON PAGE TRACKING
export const trackTimeOnPage = (page: string, timeInSeconds: number) => {
  trackEvent('time_on_page', 'engagement', page, timeInSeconds);
};

// HERO SECTION TRACKING
export const trackHeroSectionView = (page: string) => {
  trackEvent('view', 'hero_section', page);
};

export const trackTypeEffectComplete = (page: string) => {
  trackEvent('complete', 'type_effect', page);
};

// STATS TRACKING
export const trackStatsView = (location: string, statsType: string) => {
  trackEvent('view', 'stats', `${location} - ${statsType}`);
};

// SECTION TRACKING
export const trackSectionView = (sectionName: string, page: string) => {
  trackEvent('view', 'section', `${sectionName} - ${page}`);
};

// PERFORMANCE TRACKING
export const trackLoadTime = (page: string, loadTime: number) => {
  trackEvent('load_time', 'performance', page, loadTime);
};

// SEARCH TRACKING (for future use)
export const trackSearch = (query: string, results: number) => {
  trackEvent('search', 'user_action', query, results);
};

// DOWNLOAD TRACKING
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('download', 'file', `${fileName} - ${fileType}`);
};

// EXTERNAL LINK TRACKING
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('click', 'external_link', linkText || url);
};

// ERROR TRACKING
export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('error', 'site_error', `${errorType} - ${errorMessage}`);
};

// FEATURE USAGE TRACKING
export const trackFeatureUsage = (featureName: string, action: string) => {
  trackEvent(action, 'feature_usage', featureName);
};

// COMMON COMBINED TRACKING FUNCTIONS
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('click', 'button', `${buttonName} - ${location}`);
};

export const trackPageVisit = (pageName: string) => {
  trackEvent('page_view', 'navigation', pageName);
};

// ADVANCED USER BEHAVIOR TRACKING
export const trackUserFlow = (fromPage: string, toPage: string, action: string) => {
  trackEvent('user_flow', 'navigation', `${fromPage} -> ${toPage} via ${action}`);
};

export const trackEngagement = (action: string, element: string, page: string) => {
  trackEvent('engagement', 'user_interaction', `${action} - ${element} on ${page}`);
}; 