
-- Create storage bucket for content assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'content-assets', 
  'content-assets', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4', 'audio/mpeg']
);

-- Create storage policies for content assets
CREATE POLICY "Public can view content assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'content-assets');

CREATE POLICY "Authenticated users can upload content assets" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'content-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own content assets" ON storage.objects
  FOR UPDATE USING (bucket_id = 'content-assets' AND auth.uid()::text = owner);

CREATE POLICY "Users can delete their own content assets" ON storage.objects
  FOR DELETE USING (bucket_id = 'content-assets' AND auth.uid()::text = owner);

-- Verify and enhance existing RLS policies
-- Add admin access policies for content management
CREATE POLICY "Admin can manage all articles" ON public.articles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can manage all tools" ON public.tools
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can manage all content pillars" ON public.content_pillars
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create user_roles table and enum if not exists
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'author', 'user');

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create content workflow tables
CREATE TABLE public.content_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  stages JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.content_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL,
  content_type VARCHAR NOT NULL, -- 'article', 'tool'
  assigned_to UUID REFERENCES auth.users(id),
  assigned_by UUID REFERENCES auth.users(id),
  workflow_id UUID REFERENCES public.content_workflows(id),
  current_stage VARCHAR,
  due_date TIMESTAMP WITH TIME ZONE,
  priority VARCHAR DEFAULT 'medium',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on workflow tables
ALTER TABLE public.content_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_assignments ENABLE ROW LEVEL SECURITY;

-- RLS policies for workflows
CREATE POLICY "Public can view active workflows" ON public.content_workflows
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage workflows" ON public.content_workflows
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their assignments" ON public.content_assignments
  FOR SELECT USING (
    assigned_to = auth.uid() OR 
    assigned_by = auth.uid() OR 
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins and editors can manage assignments" ON public.content_assignments
  FOR ALL USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor')
  );

-- Create version control table
CREATE TABLE public.content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL,
  content_type VARCHAR NOT NULL,
  version_number INTEGER NOT NULL,
  content_data JSONB NOT NULL,
  change_summary TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(content_id, content_type, version_number)
);

ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view content versions" ON public.content_versions
  FOR SELECT USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor') OR
    created_by = auth.uid()
  );

CREATE POLICY "Authenticated users can create versions" ON public.content_versions
  FOR INSERT WITH CHECK (created_by = auth.uid());

-- Create collaboration tables
CREATE TABLE public.content_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL,
  content_type VARCHAR NOT NULL,
  parent_id UUID REFERENCES public.content_comments(id),
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  content TEXT NOT NULL,
  is_resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.content_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view comments" ON public.content_comments
  FOR SELECT USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'editor') OR
    author_id = auth.uid()
  );

CREATE POLICY "Authenticated users can create comments" ON public.content_comments
  FOR INSERT WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update their own comments" ON public.content_comments
  FOR UPDATE USING (author_id = auth.uid());

-- Add indexes for performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);
CREATE INDEX idx_content_assignments_assigned_to ON public.content_assignments(assigned_to);
CREATE INDEX idx_content_assignments_content ON public.content_assignments(content_id, content_type);
CREATE INDEX idx_content_versions_content ON public.content_versions(content_id, content_type);
CREATE INDEX idx_content_comments_content ON public.content_comments(content_id, content_type);
CREATE INDEX idx_content_comments_author ON public.content_comments(author_id);

-- Create update trigger for content_assignments
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_content_assignments_updated_at 
  BEFORE UPDATE ON public.content_assignments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_workflows_updated_at 
  BEFORE UPDATE ON public.content_workflows 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_comments_updated_at 
  BEFORE UPDATE ON public.content_comments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
