export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          _id: string
          bestseller: boolean
          category: string
          date: number
          description: string
          image: string[]
          name: string
          price: number
          productid: string
          sizes: string[]
          subcategory: string
        }
        Insert: {
          _id: string
          bestseller: boolean
          category: string
          date: number
          description: string
          image: string[]
          name: string
          price: number
          productid: string
          sizes: string[]
          subcategory: string
        }
        Update: {
          _id?: string
          bestseller?: boolean
          category?: string
          date?: number
          description?: string
          image?: string[]
          name?: string
          price?: number
          productid?: string
          sizes?: string[]
          subcategory?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}