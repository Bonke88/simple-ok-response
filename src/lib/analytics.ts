
import { supabase } from "@/integrations/supabase/client";
import type { CookbookSubscriber, ContentData, ToolUsage, GtmExperiment, ProjectStage } from "@/types/database";

export class GTMAnalytics {
  // Cookbook subscribers
  static async addSubscriber(data: {
    email: string;
    current_mrr?: number;
    project_stage?: ProjectStage;
    biggest_gtm_blocker?: string;
    hours_per_week_available?: number;
    has_customers?: boolean;
  }) {
    const { data: result, error } = await supabase
      .from('cookbook_subscribers')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error adding subscriber:', error);
      throw error;
    }

    return result as CookbookSubscriber;
  }

  static async getSubscribers() {
    const { data, error } = await supabase
      .from('cookbook_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching subscribers:', error);
      throw error;
    }

    return data as CookbookSubscriber[];
  }

  // Content data tracking
  static async trackContentInteraction(data: {
    email: string;
    article_slug: string;
    actually_implemented?: boolean;
    resulted_in_customers?: boolean;
    what_worked?: string;
    what_didnt?: string;
  }) {
    const { data: result, error } = await supabase
      .from('content_data')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error tracking content interaction:', error);
      throw error;
    }

    return result as ContentData;
  }

  // Tool usage tracking
  static async trackToolUsage(data: {
    email: string;
    tool_name: string;
    inputs_provided?: any;
    output_helpful?: boolean;
    action_taken_after?: string;
  }) {
    const { data: result, error } = await supabase
      .from('tool_usage')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error tracking tool usage:', error);
      throw error;
    }

    return result as ToolUsage;
  }

  // GTM experiments tracking
  static async trackExperiment(data: {
    email: string;
    experiment_type: string;
    hypothesis?: string;
    result?: string;
    customers_gained?: number;
    hours_invested?: number;
  }) {
    const { data: result, error } = await supabase
      .from('gtm_experiments')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Error tracking experiment:', error);
      throw error;
    }

    return result as GtmExperiment;
  }

  // Analytics queries
  static async getProjectStageDistribution() {
    const { data, error } = await supabase
      .from('cookbook_subscribers')
      .select('project_stage')
      .not('project_stage', 'is', null);

    if (error) {
      console.error('Error fetching project stage distribution:', error);
      throw error;
    }

    // Count occurrences of each stage
    const distribution = data.reduce((acc, item) => {
      const stage = item.project_stage;
      acc[stage] = (acc[stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return distribution;
  }

  static async getMostUsedTools() {
    const { data, error } = await supabase
      .from('tool_usage')
      .select('tool_name')
      .order('usage_date', { ascending: false });

    if (error) {
      console.error('Error fetching tool usage:', error);
      throw error;
    }

    // Count tool usage
    const usage = data.reduce((acc, item) => {
      acc[item.tool_name] = (acc[item.tool_name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(usage)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  }

  static async getCommonGTMBlockers() {
    const { data, error } = await supabase
      .from('cookbook_subscribers')
      .select('biggest_gtm_blocker')
      .not('biggest_gtm_blocker', 'is', null);

    if (error) {
      console.error('Error fetching GTM blockers:', error);
      throw error;
    }

    return data.map(item => item.biggest_gtm_blocker).filter(Boolean);
  }
}
