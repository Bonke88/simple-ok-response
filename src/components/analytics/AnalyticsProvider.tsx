import React, { createContext, useContext, useCallback } from 'react';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

interface AnalyticsContextType {
  track: (event: string, properties?: Record<string, any>) => void;
  trackPageView: (page: string, properties?: Record<string, any>) => void;
  trackToolUsage: (toolName: string, step: string, properties?: Record<string, any>) => void;
  trackArticleEngagement: (articleSlug: string, action: string, properties?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const track = useCallback((event: string, properties: Record<string, any> = {}) => {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      },
      timestamp: Date.now()
    };

    // Store in localStorage for now (replace with real analytics service later)
    try {
      const existingEvents = JSON.parse(localStorage.getItem('gtm_analytics') || '[]');
      existingEvents.push(analyticsEvent);
      
      // Keep only last 1000 events to prevent localStorage bloat
      if (existingEvents.length > 1000) {
        existingEvents.splice(0, existingEvents.length - 1000);
      }
      
      localStorage.setItem('gtm_analytics', JSON.stringify(existingEvents));
      
      // Also log to console for debugging
      console.log('Analytics Event:', analyticsEvent);
    } catch (error) {
      console.error('Failed to store analytics event:', error);
    }
  }, []);

  const trackPageView = useCallback((page: string, properties: Record<string, any> = {}) => {
    track('page_view', {
      page,
      ...properties
    });
  }, [track]);

  const trackToolUsage = useCallback((toolName: string, step: string, properties: Record<string, any> = {}) => {
    track('tool_usage', {
      tool_name: toolName,
      step,
      ...properties
    });
  }, [track]);

  const trackArticleEngagement = useCallback((articleSlug: string, action: string, properties: Record<string, any> = {}) => {
    track('article_engagement', {
      article_slug: articleSlug,
      action,
      ...properties
    });
  }, [track]);

  const value: AnalyticsContextType = {
    track,
    trackPageView,
    trackToolUsage,
    trackArticleEngagement
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
