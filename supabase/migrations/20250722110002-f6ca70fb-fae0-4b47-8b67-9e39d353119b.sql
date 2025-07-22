
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Content Pillars Table (Core taxonomy)
CREATE TABLE content_pillars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content_percentage INTEGER, -- e.g., 25 for "25% of content"
    order_index INTEGER DEFAULT 0,
    color_theme VARCHAR(7), -- Hex color for UI
    icon_name VARCHAR(50), -- For UI representation
    meta_description TEXT, -- SEO
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles Table (Main content)
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pillar_id UUID REFERENCES content_pillars(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    subtitle TEXT,
    content JSONB NOT NULL, -- Structured content blocks
    word_count INTEGER,
    reading_time INTEGER, -- in minutes
    difficulty_level VARCHAR(50), -- "Uncomfortable but necessary"
    time_investment VARCHAR(100), -- "This takes 2 hours"
    expected_results TEXT, -- "1-3 customers in 14 days"
    bailout_plan TEXT, -- "If this fails, here's plan B"
    success_stories JSONB, -- Array of success story objects
    
    -- SEO/GEO Fields
    meta_title VARCHAR(255),
    meta_description TEXT,
    keywords TEXT[],
    canonical_url VARCHAR(500),
    
    -- GEO Optimization
    geo_metadata JSONB DEFAULT '{
        "claude_markers": {},
        "chatgpt_optimization": {},
        "perplexity_format": {}
    }',
    
    -- Schema.org structured data
    structured_data JSONB,
    
    -- Publishing
    status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
    published_at TIMESTAMPTZ,
    featured BOOLEAN DEFAULT false,
    
    -- Analytics
    view_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    conversion_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tools Table (Interactive calculators and generators)
CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pillar_id UUID REFERENCES content_pillars(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    tool_type VARCHAR(100), -- calculator, generator, diagnostic, planner
    
    -- Tool Configuration
    config JSONB NOT NULL, -- Tool-specific configuration
    input_schema JSONB, -- Expected inputs
    output_schema JSONB, -- Output format
    
    -- Embedding
    embed_code TEXT, -- For standalone tool pages
    can_embed BOOLEAN DEFAULT true,
    
    -- Usage Tracking
    usage_count INTEGER DEFAULT 0,
    completion_rate DECIMAL(5,2),
    average_session_time INTEGER, -- seconds
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags Table
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50), -- topic, audience, stage, format
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Article Tags Junction
CREATE TABLE article_tags (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- Tool Tags Junction
CREATE TABLE tool_tags (
    tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (tool_id, tag_id)
);

-- Authors Table
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(500),
    social_links JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Article Authors Junction
CREATE TABLE article_authors (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, author_id)
);

-- Content Relationships (for related content)
CREATE TABLE content_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_type VARCHAR(50), -- article, tool
    source_id UUID NOT NULL,
    target_type VARCHAR(50), -- article, tool
    target_id UUID NOT NULL,
    relationship_type VARCHAR(50), -- prerequisite, related, next_step
    strength INTEGER DEFAULT 50, -- 0-100
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(source_type, source_id, target_type, target_id)
);

-- Journey Stages (for content mapping)
CREATE TABLE journey_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    month_range VARCHAR(50), -- "0-1", "2-3", "4-6"
    description TEXT,
    goals TEXT[],
    metrics JSONB,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Article Journey Mapping
CREATE TABLE article_journey_mapping (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    journey_stage_id UUID REFERENCES journey_stages(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    PRIMARY KEY (article_id, journey_stage_id)
);

-- Content Templates (for consistent structure)
CREATE TABLE content_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    template_type VARCHAR(50), -- article, tool_output, email
    structure JSONB NOT NULL, -- Template structure
    variables JSONB, -- Dynamic variables
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics Events (for tracking)
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL, -- view, share, conversion, tool_use
    content_type VARCHAR(50), -- article, tool
    content_id UUID NOT NULL,
    user_identifier VARCHAR(255), -- Anonymous ID
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX idx_articles_pillar_id ON articles(pillar_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_tools_pillar_id ON tools(pillar_id);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_analytics_content ON analytics_events(content_type, content_id);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);

-- Full-text search
CREATE INDEX idx_articles_search ON articles USING gin(
    to_tsvector('english', title || ' ' || COALESCE(subtitle, '') || ' ' || COALESCE(meta_description, ''))
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER content_pillars_updated_at BEFORE UPDATE ON content_pillars
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tools_updated_at BEFORE UPDATE ON tools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security on all new tables
ALTER TABLE content_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_journey_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create public access policies for content (since this is a public content site)
CREATE POLICY "Allow public read access to content_pillars" 
  ON content_pillars 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Allow public read access to published articles" 
  ON articles 
  FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Allow public read access to published tools" 
  ON tools 
  FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Allow public read access to tags" 
  ON tags 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to article_tags" 
  ON article_tags 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to tool_tags" 
  ON tool_tags 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to authors" 
  ON authors 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Allow public read access to article_authors" 
  ON article_authors 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to content_relationships" 
  ON content_relationships 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to journey_stages" 
  ON journey_stages 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to article_journey_mapping" 
  ON article_journey_mapping 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert to analytics_events" 
  ON analytics_events 
  FOR INSERT 
  WITH CHECK (true);

-- Insert Content Pillars based on Google Doc
INSERT INTO content_pillars (name, slug, description, content_percentage, order_index, color_theme, icon_name) VALUES
('Picking Winners', 'picking-winners', 'Choose projects that can actually find paying customers, not just cool tech', 25, 1, '#3B82F6', 'TrendingUp'),
('Ship It', 'ship-it', 'Breaking Free from Almost-Done Purgatory - Help corporate engineers escape the eternal MVP cycle', 25, 2, '#10B981', 'Rocket'),
('First Customers', 'first-customers', 'Get your first paying customers and hit meaningful revenue', 40, 3, '#F59E0B', 'Users'),
('Scale', 'scale', 'Scale what''s working without burning out', 10, 4, '#8B5CF6', 'TrendingUp');

-- Insert Journey Stages
INSERT INTO journey_stages (name, slug, month_range, description, goals, order_index) VALUES
('Foundation', 'foundation', '0-1', 'Pick the right project and validate with real payment intent', 
 ARRAY['Pick the right project', 'Validate with payment intent', 'Set up basic GTM tools', 'Get first paying customer'], 1),
('Traction', 'traction', '2-3', 'Build momentum and prove the concept works',
 ARRAY['Hit $1K MRR milestone', 'Find one channel that works', 'Build repeatable systems', 'Prove this can work'], 2),
('Scale', 'scale', '4-6', 'Push toward meaningful revenue and make strategic decisions',
 ARRAY['Push toward $10K MRR', 'Automate repetitive parts', 'Make quit/stay decision', 'Keep passion alive'], 3);

-- Insert sample author
INSERT INTO authors (email, name, bio, is_active) VALUES
('jon@gtmjon.dev', 'GTM Jon', 'Engineering leader turned GTM practitioner. Helps engineers build sustainable side businesses.', true);
