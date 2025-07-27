import { z } from 'zod';

// Plan and Status Enums
export const PlanTier = z.enum(['ANON', 'FREE', 'PREMIUM']);
export const PromptStatus = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

export type PlanTierType = z.infer<typeof PlanTier>;
export type PromptStatusType = z.infer<typeof PromptStatus>;

// Category Schema
export const CategorySchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  sort_order: z.number().default(0),
  is_featured: z.boolean().default(false),
});

export type Category = z.infer<typeof CategorySchema>;

// Prompt Schema
export const PromptSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  short_description: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  category_slug: z.string().min(1, 'Category slug is required'),
  category_name: z.string().optional(),
  category_description: z.string().optional(),
  visibility: PlanTier,
  status: PromptStatus,
  tags: z.array(z.string()).default([]),
  is_featured: z.boolean().default(false),
  sort_order: z.number().default(0),
  version: z.number().default(1),
});

export type Prompt = z.infer<typeof PromptSchema>;

// CSV Row Schema (for parsing)
export const CSVRowSchema = z.object({
  slug: z.string(),
  title: z.string(),
  short_description: z.string(),
  content: z.string(),
  category_slug: z.string(),
  category_name: z.string(),
  category_description: z.string(),
  visibility: z.string(),
  status: z.string(),
  tags: z.string(),
  is_featured: z.string(),
  sort_order: z.string(),
  version: z.string(),
});

export type CSVRow = z.infer<typeof CSVRowSchema>;

// Validation result types
export interface ValidationError {
  row: number;
  field: string;
  message: string;
  value: any;
}

export interface ParsedCSVResult {
  validRows: Prompt[];
  invalidRows: ValidationError[];
  totalRows: number;
  categoriesDetected: string[];
}

// UI State types
export interface UploadState {
  file: File | null;
  isProcessing: boolean;
  results: ParsedCSVResult | null;
  diffMode: 'INSERT' | 'UPDATE' | 'INVALID' | null;
}

// Auth mock types
export interface MockUser {
  id: string;
  email: string;
  role: 'user' | 'admin';
  plan: PlanTierType;
}

export interface AuthState {
  user: MockUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}