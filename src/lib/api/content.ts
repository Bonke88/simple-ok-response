
import { supabase } from '@/integrations/supabase/client';

export interface ContentFilters {
  pillar?: string;
  tags?: string[];
  status?: string;
  difficulty?: string;
  timeRange?: string;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export class ContentAPI {
  static async getArticles(filters: ContentFilters = {}) {
    let query = supabase
      .from('articles')
      .select(`
        *,
        content_pillars (
          id,
          name,
          slug,
          color_theme
        ),
        article_tags (
          tag:tags (
            id,
            name,
            slug
          )
        ),
        article_authors (
          author:authors (
            id,
            name,
            avatar_url
          )
        )
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    // Apply filters
    if (filters.pillar) {
      query = query.eq('pillar_id', filters.pillar);
    }

    if (filters.searchQuery) {
      query = query.textSearch('title,subtitle,meta_description', filters.searchQuery);
    }

    if (filters.difficulty) {
      query = query.eq('difficulty_level', filters.difficulty);
    }

    // Pagination
    const limit = filters.limit || 10;
    const offset = filters.offset || 0;
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    
    if (error) throw error;

    return {
      data,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      }
    };
  }

  static async getArticleBySlug(pillarSlug: string, articleSlug: string) {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        content_pillars (
          id,
          name,
          slug,
          color_theme
        ),
        article_tags (
          tag:tags (
            id,
            name,
            slug
          )
        ),
        article_authors (
          author:authors (
            id,
            name,
            bio,
            avatar_url
          )
        )
      `)
      .eq('slug', articleSlug)
      .eq('content_pillars.slug', pillarSlug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return data;
  }

  static async getPillars() {
    const { data, error } = await supabase
      .from('content_pillars')
      .select('*')
      .eq('is_active', true)
      .order('order_index');

    if (error) throw error;
    return data;
  }

  static async getTools(filters: ContentFilters = {}) {
    let query = supabase
      .from('tools')
      .select(`
        *,
        content_pillars (
          id,
          name,
          slug,
          color_theme
        ),
        tool_tags (
          tag:tags (
            id,
            name,
            slug
          )
        )
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (filters.pillar) {
      query = query.eq('pillar_id', filters.pillar);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getToolBySlug(slug: string) {
    const { data, error } = await supabase
      .from('tools')
      .select(`
        *,
        content_pillars (
          id,
          name,
          slug,
          color_theme
        )
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return data;
  }

  static async trackEvent(eventType: string, contentType: string, contentId: string, metadata?: any) {
    // Generate anonymous user identifier
    const userIdentifier = localStorage.getItem('anonymous_user_id') || 
      `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    if (!localStorage.getItem('anonymous_user_id')) {
      localStorage.setItem('anonymous_user_id', userIdentifier);
    }

    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_type: eventType,
        content_type: contentType,
        content_id: contentId,
        user_identifier: userIdentifier,
        metadata: metadata || {}
      });

    if (error) {
      console.error('Failed to track event:', error);
    }
  }

  static async getRelatedContent(articleId: string, limit = 3) {
    const { data, error } = await supabase
      .from('content_relationships')
      .select(`
        target_id,
        target_type,
        relationship_type,
        strength
      `)
      .eq('source_id', articleId)
      .eq('source_type', 'article')
      .order('strength', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  static async searchContent(query: string, limit = 10) {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        id,
        title,
        subtitle,
        slug,
        reading_time,
        content_pillars (
          name,
          slug,
          color_theme
        )
      `)
      .textSearch('title,subtitle,meta_description', query)
      .eq('status', 'published')
      .limit(limit);

    if (error) throw error;
    return data;
  }
}
