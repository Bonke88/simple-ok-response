
-- Create enum types for dropdown values
CREATE TYPE project_stage AS ENUM (
  'Just an idea',
  'Building in secret', 
  '80% done',
  'Launched to crickets',
  'Making some money'
);

-- Create cookbook_subscribers table
CREATE TABLE public.cookbook_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  current_mrr DECIMAL(10,2) DEFAULT 0,
  project_stage project_stage,
  biggest_gtm_blocker TEXT,
  hours_per_week_available INTEGER,
  has_customers BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create content_data table
CREATE TABLE public.content_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  article_slug TEXT NOT NULL,
  actually_implemented BOOLEAN DEFAULT false,
  resulted_in_customers BOOLEAN DEFAULT false,
  what_worked TEXT,
  what_didnt TEXT,
  read_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tool_usage table
CREATE TABLE public.tool_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  inputs_provided JSONB,
  output_helpful BOOLEAN DEFAULT false,
  action_taken_after TEXT,
  usage_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gtm_experiments table
CREATE TABLE public.gtm_experiments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  experiment_type TEXT NOT NULL,
  hypothesis TEXT,
  result TEXT,
  customers_gained INTEGER DEFAULT 0,
  hours_invested DECIMAL(5,2) DEFAULT 0,
  experiment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX idx_cookbook_subscribers_email ON public.cookbook_subscribers(email);
CREATE INDEX idx_content_data_email ON public.content_data(email);
CREATE INDEX idx_content_data_article_slug ON public.content_data(article_slug);
CREATE INDEX idx_tool_usage_email ON public.tool_usage(email);
CREATE INDEX idx_tool_usage_tool_name ON public.tool_usage(tool_name);
CREATE INDEX idx_gtm_experiments_email ON public.gtm_experiments(email);
CREATE INDEX idx_gtm_experiments_type ON public.gtm_experiments(experiment_type);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.cookbook_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gtm_experiments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies - allowing public access for now since this appears to be analytics data
-- You may want to restrict these based on your authentication requirements

-- Policies for cookbook_subscribers
CREATE POLICY "Allow public read access to cookbook_subscribers" 
  ON public.cookbook_subscribers 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert to cookbook_subscribers" 
  ON public.cookbook_subscribers 
  FOR INSERT 
  WITH CHECK (true);

-- Policies for content_data
CREATE POLICY "Allow public read access to content_data" 
  ON public.content_data 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert to content_data" 
  ON public.content_data 
  FOR INSERT 
  WITH CHECK (true);

-- Policies for tool_usage
CREATE POLICY "Allow public read access to tool_usage" 
  ON public.tool_usage 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert to tool_usage" 
  ON public.tool_usage 
  FOR INSERT 
  WITH CHECK (true);

-- Policies for gtm_experiments
CREATE POLICY "Allow public read access to gtm_experiments" 
  ON public.gtm_experiments 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert to gtm_experiments" 
  ON public.gtm_experiments 
  FOR INSERT 
  WITH CHECK (true);
