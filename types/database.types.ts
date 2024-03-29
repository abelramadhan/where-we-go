export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      activity: {
        Row: {
          budget: number | null;
          checked: boolean;
          created_at: string;
          created_by: string | null;
          description: string | null;
          google_map_link: string | null;
          id: number;
          planned_date: string | null;
          title: string;
        };
        Insert: {
          budget?: number | null;
          checked?: boolean;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          google_map_link?: string | null;
          id?: number;
          planned_date?: string | null;
          title: string;
        };
        Update: {
          budget?: number | null;
          checked?: boolean;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          google_map_link?: string | null;
          id?: number;
          planned_date?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'activity_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      activity_group_relation: {
        Row: {
          activity_id: number;
          created_at: string;
          group_id: number;
          id: number;
        };
        Insert: {
          activity_id: number;
          created_at?: string;
          group_id: number;
          id?: number;
        };
        Update: {
          activity_id?: number;
          created_at?: string;
          group_id?: number;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'activity_group_relation_activity_id_fkey';
            columns: ['activity_id'];
            isOneToOne: false;
            referencedRelation: 'activity';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'activity_group_relation_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'user_group';
            referencedColumns: ['id'];
          },
        ];
      };
      user_group: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      user_group_invite: {
        Row: {
          created_at: string;
          group_id: number;
          id: number;
          invite_code: string;
          is_used: boolean;
        };
        Insert: {
          created_at?: string;
          group_id: number;
          id?: number;
          invite_code?: string;
          is_used?: boolean;
        };
        Update: {
          created_at?: string;
          group_id?: number;
          id?: number;
          invite_code?: string;
          is_used?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'user_group_invite_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'user_group';
            referencedColumns: ['id'];
          },
        ];
      };
      user_group_relation: {
        Row: {
          created_at: string;
          group_id: number;
          id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          group_id: number;
          id?: number;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          group_id?: number;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_group_relation_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'user_group';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_group_relation_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
    ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
