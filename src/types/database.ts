
export type ProjectStage = 
  | 'Just an idea'
  | 'Building in secret'
  | '80% done'
  | 'Launched to crickets'
  | 'Making some money';

export interface CookbookSubscriber {
  id: string;
  email: string;
  current_mrr?: number;
  project_stage?: ProjectStage;
  biggest_gtm_blocker?: string;
  hours_per_week_available?: number;
  has_customers?: boolean;
  created_at: string;
}

export interface ContentData {
  id: string;
  email: string;
  article_slug: string;
  actually_implemented?: boolean;
  resulted_in_customers?: boolean;
  what_worked?: string;
  what_didnt?: string;
  read_date: string;
}

export interface ToolUsage {
  id: string;
  email: string;
  tool_name: string;
  inputs_provided?: any;
  output_helpful?: boolean;
  action_taken_after?: string;
  usage_date: string;
}

export interface GtmExperiment {
  id: string;
  email: string;
  experiment_type: string;
  hypothesis?: string;
  result?: string;
  customers_gained?: number;
  hours_invested?: number;
  experiment_date: string;
}
