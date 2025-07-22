export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          content_id: string
          content_type: string | null
          created_at: string | null
          event_type: string
          id: string
          metadata: Json | null
          user_identifier: string | null
        }
        Insert: {
          content_id: string
          content_type?: string | null
          created_at?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          user_identifier?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string | null
          created_at?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          user_identifier?: string | null
        }
        Relationships: []
      }
      article_authors: {
        Row: {
          article_id: string
          author_id: string
        }
        Insert: {
          article_id: string
          author_id: string
        }
        Update: {
          article_id?: string
          author_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_authors_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_authors_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
        ]
      }
      article_journey_mapping: {
        Row: {
          article_id: string
          is_primary: boolean | null
          journey_stage_id: string
        }
        Insert: {
          article_id: string
          is_primary?: boolean | null
          journey_stage_id: string
        }
        Update: {
          article_id?: string
          is_primary?: boolean | null
          journey_stage_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_journey_mapping_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_journey_mapping_journey_stage_id_fkey"
            columns: ["journey_stage_id"]
            isOneToOne: false
            referencedRelation: "journey_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      article_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_tags_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          bailout_plan: string | null
          canonical_url: string | null
          content: Json
          conversion_count: number | null
          created_at: string | null
          difficulty_level: string | null
          expected_results: string | null
          featured: boolean | null
          geo_metadata: Json | null
          id: string
          keywords: string[] | null
          meta_description: string | null
          meta_title: string | null
          pillar_id: string | null
          published_at: string | null
          reading_time: number | null
          share_count: number | null
          slug: string
          status: string | null
          structured_data: Json | null
          subtitle: string | null
          success_stories: Json | null
          time_investment: string | null
          title: string
          updated_at: string | null
          view_count: number | null
          word_count: number | null
        }
        Insert: {
          bailout_plan?: string | null
          canonical_url?: string | null
          content: Json
          conversion_count?: number | null
          created_at?: string | null
          difficulty_level?: string | null
          expected_results?: string | null
          featured?: boolean | null
          geo_metadata?: Json | null
          id?: string
          keywords?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          pillar_id?: string | null
          published_at?: string | null
          reading_time?: number | null
          share_count?: number | null
          slug: string
          status?: string | null
          structured_data?: Json | null
          subtitle?: string | null
          success_stories?: Json | null
          time_investment?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
          word_count?: number | null
        }
        Update: {
          bailout_plan?: string | null
          canonical_url?: string | null
          content?: Json
          conversion_count?: number | null
          created_at?: string | null
          difficulty_level?: string | null
          expected_results?: string | null
          featured?: boolean | null
          geo_metadata?: Json | null
          id?: string
          keywords?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          pillar_id?: string | null
          published_at?: string | null
          reading_time?: number | null
          share_count?: number | null
          slug?: string
          status?: string | null
          structured_data?: Json | null
          subtitle?: string | null
          success_stories?: Json | null
          time_investment?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_pillar_id_fkey"
            columns: ["pillar_id"]
            isOneToOne: false
            referencedRelation: "content_pillars"
            referencedColumns: ["id"]
          },
        ]
      }
      authors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          name: string
          social_links: Json | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          name: string
          social_links?: Json | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string
          social_links?: Json | null
        }
        Relationships: []
      }
      content_data: {
        Row: {
          actually_implemented: boolean | null
          article_slug: string
          email: string
          id: string
          read_date: string
          resulted_in_customers: boolean | null
          what_didnt: string | null
          what_worked: string | null
        }
        Insert: {
          actually_implemented?: boolean | null
          article_slug: string
          email: string
          id?: string
          read_date?: string
          resulted_in_customers?: boolean | null
          what_didnt?: string | null
          what_worked?: string | null
        }
        Update: {
          actually_implemented?: boolean | null
          article_slug?: string
          email?: string
          id?: string
          read_date?: string
          resulted_in_customers?: boolean | null
          what_didnt?: string | null
          what_worked?: string | null
        }
        Relationships: []
      }
      content_pillars: {
        Row: {
          color_theme: string | null
          content_percentage: number | null
          created_at: string | null
          description: string | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          meta_description: string | null
          name: string
          order_index: number | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          color_theme?: string | null
          content_percentage?: number | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          meta_description?: string | null
          name: string
          order_index?: number | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          color_theme?: string | null
          content_percentage?: number | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          meta_description?: string | null
          name?: string
          order_index?: number | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      content_relationships: {
        Row: {
          created_at: string | null
          id: string
          relationship_type: string | null
          source_id: string
          source_type: string | null
          strength: number | null
          target_id: string
          target_type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          relationship_type?: string | null
          source_id: string
          source_type?: string | null
          strength?: number | null
          target_id: string
          target_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          relationship_type?: string | null
          source_id?: string
          source_type?: string | null
          strength?: number | null
          target_id?: string
          target_type?: string | null
        }
        Relationships: []
      }
      content_templates: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
          structure: Json
          template_type: string | null
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
          structure: Json
          template_type?: string | null
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
          structure?: Json
          template_type?: string | null
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      cookbook_subscribers: {
        Row: {
          biggest_gtm_blocker: string | null
          created_at: string
          current_mrr: number | null
          email: string
          has_customers: boolean | null
          hours_per_week_available: number | null
          id: string
          project_stage: Database["public"]["Enums"]["project_stage"] | null
        }
        Insert: {
          biggest_gtm_blocker?: string | null
          created_at?: string
          current_mrr?: number | null
          email: string
          has_customers?: boolean | null
          hours_per_week_available?: number | null
          id?: string
          project_stage?: Database["public"]["Enums"]["project_stage"] | null
        }
        Update: {
          biggest_gtm_blocker?: string | null
          created_at?: string
          current_mrr?: number | null
          email?: string
          has_customers?: boolean | null
          hours_per_week_available?: number | null
          id?: string
          project_stage?: Database["public"]["Enums"]["project_stage"] | null
        }
        Relationships: []
      }
      gtm_experiments: {
        Row: {
          customers_gained: number | null
          email: string
          experiment_date: string
          experiment_type: string
          hours_invested: number | null
          hypothesis: string | null
          id: string
          result: string | null
        }
        Insert: {
          customers_gained?: number | null
          email: string
          experiment_date?: string
          experiment_type: string
          hours_invested?: number | null
          hypothesis?: string | null
          id?: string
          result?: string | null
        }
        Update: {
          customers_gained?: number | null
          email?: string
          experiment_date?: string
          experiment_type?: string
          hours_invested?: number | null
          hypothesis?: string | null
          id?: string
          result?: string | null
        }
        Relationships: []
      }
      journey_stages: {
        Row: {
          created_at: string | null
          description: string | null
          goals: string[] | null
          id: string
          metrics: Json | null
          month_range: string | null
          name: string
          order_index: number | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          goals?: string[] | null
          id?: string
          metrics?: Json | null
          month_range?: string | null
          name: string
          order_index?: number | null
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          goals?: string[] | null
          id?: string
          metrics?: Json | null
          month_range?: string | null
          name?: string
          order_index?: number | null
          slug?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          name: string
          slug: string
          usage_count: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          name: string
          slug: string
          usage_count?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      tool_tags: {
        Row: {
          tag_id: string
          tool_id: string
        }
        Insert: {
          tag_id: string
          tool_id: string
        }
        Update: {
          tag_id?: string
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_tags_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_usage: {
        Row: {
          action_taken_after: string | null
          email: string
          id: string
          inputs_provided: Json | null
          output_helpful: boolean | null
          tool_name: string
          usage_date: string
        }
        Insert: {
          action_taken_after?: string | null
          email: string
          id?: string
          inputs_provided?: Json | null
          output_helpful?: boolean | null
          tool_name: string
          usage_date?: string
        }
        Update: {
          action_taken_after?: string | null
          email?: string
          id?: string
          inputs_provided?: Json | null
          output_helpful?: boolean | null
          tool_name?: string
          usage_date?: string
        }
        Relationships: []
      }
      tools: {
        Row: {
          average_session_time: number | null
          can_embed: boolean | null
          completion_rate: number | null
          config: Json
          created_at: string | null
          description: string | null
          embed_code: string | null
          id: string
          input_schema: Json | null
          meta_description: string | null
          meta_title: string | null
          name: string
          output_schema: Json | null
          pillar_id: string | null
          slug: string
          status: string | null
          tool_type: string | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          average_session_time?: number | null
          can_embed?: boolean | null
          completion_rate?: number | null
          config: Json
          created_at?: string | null
          description?: string | null
          embed_code?: string | null
          id?: string
          input_schema?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          output_schema?: Json | null
          pillar_id?: string | null
          slug: string
          status?: string | null
          tool_type?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          average_session_time?: number | null
          can_embed?: boolean | null
          completion_rate?: number | null
          config?: Json
          created_at?: string | null
          description?: string | null
          embed_code?: string | null
          id?: string
          input_schema?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          output_schema?: Json | null
          pillar_id?: string | null
          slug?: string
          status?: string | null
          tool_type?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tools_pillar_id_fkey"
            columns: ["pillar_id"]
            isOneToOne: false
            referencedRelation: "content_pillars"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      project_stage:
        | "Just an idea"
        | "Building in secret"
        | "80% done"
        | "Launched to crickets"
        | "Making some money"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      project_stage: [
        "Just an idea",
        "Building in secret",
        "80% done",
        "Launched to crickets",
        "Making some money",
      ],
    },
  },
} as const
