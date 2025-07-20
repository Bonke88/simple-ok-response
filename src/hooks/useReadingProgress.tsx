
import { useState, useEffect } from 'react';

interface ReadingProgressOptions {
  threshold?: number; // Percentage of article read to consider "engaged"
  updateInterval?: number; // How often to update progress (ms)
}

export const useReadingProgress = (
  articleId: string,
  options: ReadingProgressOptions = {}
) => {
  const { threshold = 25, updateInterval = 1000 } = options;
  const [progress, setProgress] = useState(0);
  const [isEngaged, setIsEngaged] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    let interval: NodeJS.Timeout;

    const updateProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      setProgress(Math.min(scrolled, 100));
      setReadingTime(Date.now() - startTime);
      
      if (scrolled >= threshold && !isEngaged) {
        setIsEngaged(true);
      }
    };

    const handleScroll = () => {
      updateProgress();
    };

    // Update progress on scroll
    window.addEventListener('scroll', handleScroll);
    
    // Also update periodically for time tracking
    interval = setInterval(updateProgress, updateInterval);

    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (interval) clearInterval(interval);
    };
  }, [articleId, threshold, updateInterval, isEngaged]);

  return {
    progress: Math.round(progress),
    isEngaged,
    readingTime: Math.round(readingTime / 1000), // Return in seconds
    isComplete: progress >= 95 // Consider 95% as complete
  };
};
