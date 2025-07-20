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
