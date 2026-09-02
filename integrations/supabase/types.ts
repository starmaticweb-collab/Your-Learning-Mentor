export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      tutor_leads: {
        Row: {
          created_at: string
          id: string
          message: string | null
          student_email: string
          student_name: string
          tutor_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          student_email: string
          student_name: string
          tutor_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          student_email?: string
          student_name?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_leads_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_leads_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors_public"
            referencedColumns: ["id"]
          },
        ]
      }
      tutors: {
        Row: {
          approved_at: string | null
          area: string | null
          availability: string | null
          boards: string[]
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          experience_years: string | null
          fee_max: number | null
          fee_min: number | null
          grade_levels: string[]
          id: string
          intro: string | null
          languages: string[]
          lead_count: number
          mode: string
          name: string
          phone: string | null
          photo_url: string | null
          qualification: string | null
          rejection_reason: string | null
          slug: string
          state: string | null
          status: string
          subjects: string[]
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          area?: string | null
          availability?: string | null
          boards?: string[]
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          experience_years?: string | null
          fee_max?: number | null
          fee_min?: number | null
          grade_levels?: string[]
          id?: string
          intro?: string | null
          languages?: string[]
          lead_count?: number
          mode?: string
          name: string
          phone?: string | null
          photo_url?: string | null
          qualification?: string | null
          rejection_reason?: string | null
          slug: string
          state?: string | null
          status?: string
          subjects?: string[]
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          area?: string | null
          availability?: string | null
          boards?: string[]
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          experience_years?: string | null
          fee_max?: number | null
          fee_min?: number | null
          grade_levels?: string[]
          id?: string
          intro?: string | null
          languages?: string[]
          lead_count?: number
          mode?: string
          name?: string
          phone?: string | null
          photo_url?: string | null
          qualification?: string | null
          rejection_reason?: string | null
          slug?: string
          state?: string | null
          status?: string
          subjects?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      tutors_public: {
        Row: {
          approved_at: string | null
          area: string | null
          availability: string | null
          boards: string[] | null
          city: string | null
          country: string | null
          created_at: string | null
          experience_years: string | null
          fee_max: number | null
          fee_min: number | null
          grade_levels: string[] | null
          id: string | null
          intro: string | null
          languages: string[] | null
          lead_count: number | null
          mode: string | null
          name: string | null
          photo_url: string | null
          qualification: string | null
          slug: string | null
          state: string | null
          status: string | null
          subjects: string[] | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          area?: string | null
          availability?: string | null
          boards?: string[] | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          experience_years?: string | null
          fee_max?: number | null
          fee_min?: number | null
          grade_levels?: string[] | null
          id?: string | null
          intro?: string | null
          languages?: string[] | null
          lead_count?: number | null
          mode?: string | null
          name?: string | null
          photo_url?: string | null
          qualification?: string | null
          slug?: string | null
          state?: string | null
          status?: string | null
          subjects?: string[] | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          area?: string | null
          availability?: string | null
          boards?: string[] | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          experience_years?: string | null
          fee_max?: number | null
          fee_min?: number | null
          grade_levels?: string[] | null
          id?: string | null
          intro?: string | null
          languages?: string[] | null
          lead_count?: number | null
          mode?: string | null
          name?: string | null
          photo_url?: string | null
          qualification?: string | null
          slug?: string | null
          state?: string | null
          status?: string | null
          subjects?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_tutor_slug_available: { Args: { _slug: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      submit_tutor_application: {
        Args: {
          _area: string
          _availability: string
          _boards: string[]
          _city: string
          _country: string
          _email: string
          _experience_years: string
          _fee_max: number
          _fee_min: number
          _grade_levels: string[]
          _intro: string
          _languages: string[]
          _mode: string
          _name: string
          _phone: string
          _photo_url: string
          _qualification: string
          _slug: string
          _state: string
          _subjects: string[]
        }
        Returns: string
      }
      submit_tutor_lead: {
        Args: {
          _student_email: string
          _student_name: string
          _tutor_id: string
        }
        Returns: {
          email: string
          phone: string
          whatsapp: string
        }[]
      }
    }
    Enums: {
      app_role: "admin"
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
      app_role: ["admin"],
    },
  },
} as const
