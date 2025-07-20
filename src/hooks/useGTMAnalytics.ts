
import { useState } from 'react';
import { GTMAnalytics } from '@/lib/analytics';
import type { ProjectStage } from '@/types/database';

export const useGTMAnalytics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackSubscriber = async (data: {
    email: string;
    current_mrr?: number;
    project_stage?: ProjectStage;
    biggest_gtm_blocker?: string;
    hours_per_week_available?: number;
    has_customers?: boolean;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await GTMAnalytics.addSubscriber(data);
      console.log('Subscriber tracked:', result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to track subscriber';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const trackContentInteraction = async (data: {
    email: string;
    article_slug: string;
    actually_implemented?: boolean;
    resulted_in_customers?: boolean;
    what_worked?: string;
    what_didnt?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await GTMAnalytics.trackContentInteraction(data);
      console.log('Content interaction tracked:', result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to track content interaction';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const trackToolUsage = async (data: {
    email: string;
    tool_name: string;
    inputs_provided?: any;
    output_helpful?: boolean;
    action_taken_after?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await GTMAnalytics.trackToolUsage(data);
      console.log('Tool usage tracked:', result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to track tool usage';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const trackExperiment = async (data: {
    email: string;
    experiment_type: string;
    hypothesis?: string;
    result?: string;
    customers_gained?: number;
    hours_invested?: number;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await GTMAnalytics.trackExperiment(data);
      console.log('Experiment tracked:', result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to track experiment';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    trackSubscriber,
    trackContentInteraction,
    trackToolUsage,
    trackExperiment,
    isLoading,
    error
  };
};
