
import React from 'react';
import { cn } from '@/lib/utils';

interface ReadingProgressProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
}

const ReadingProgress = ({ progress, className, showPercentage = false }: ReadingProgressProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="w-full bg-muted rounded-full h-1">
        <div 
          className="bg-primary h-1 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-xs text-muted-foreground mt-1 text-center">
          {Math.round(progress)}% read
        </div>
      )}
    </div>
  );
};

export default ReadingProgress;
