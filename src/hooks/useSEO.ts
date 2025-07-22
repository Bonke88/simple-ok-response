import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOMetrics {
  pageUrl: string;
  title: string;
  loadTime: number;
  userAgent: string;
  referrer: string;
}

export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view for SEO analytics
    const startTime = performance.now();
    
    const trackPageView = () => {
      const loadTime = performance.now() - startTime;
      const metrics: SEOMetrics = {
        pageUrl: window.location.href,
        title: document.title,
        loadTime,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      };

      // Store in localStorage for analytics
      const existingMetrics = JSON.parse(localStorage.getItem('seo_metrics') || '[]');
      existingMetrics.push({
        ...metrics,
        timestamp: new Date().toISOString()
      });
      
      // Keep only last 100 entries
      if (existingMetrics.length > 100) {
        existingMetrics.splice(0, existingMetrics.length - 100);
      }
      
      localStorage.setItem('seo_metrics', JSON.stringify(existingMetrics));
    };

    // Track when page is fully loaded
    if (document.readyState === 'complete') {
      trackPageView();
    } else {
      window.addEventListener('load', trackPageView);
      return () => window.removeEventListener('load', trackPageView);
    }
  }, [location]);

  const updateMetaDescription = (description: string) => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }
  };

  const updateCanonicalUrl = (url: string) => {
    const existing = document.querySelector('link[rel="canonical"]');
    if (existing) {
      existing.setAttribute('href', url);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = url;
      document.head.appendChild(link);
    }
  };

  return {
    updateMetaDescription,
    updateCanonicalUrl
  };
};
