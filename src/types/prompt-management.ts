import { z } from "zod";

// Enums
export type PlanTier = 'ANON' | 'FREE' | 'PREMIUM';
export type PromptStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

// Zod Schemas
export const PlanTierEnum = z.enum(["ANON","FREE","PREMIUM"]);
export const PromptStatusEnum = z.enum(["DRAFT","PUBLISHED","ARCHIVED"]);

export const CategorySchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  sortOrder: z.number().int().min(0).default(0).optional(),
  isFeatured: z.boolean().default(false).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const PromptSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  categorySlug: z.string().min(1),
  title: z.string().min(1).max(120),
  shortDescription: z.string().max(200).optional(),
  content: z.string().min(1),
  status: PromptStatusEnum,
  visibility: PlanTierEnum,
  tags: z.array(z.string().min(1)).optional(),
  version: z.number().int().min(1),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
  createdBy: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const PromptVersionSchema = z.object({
  id: z.string().uuid(),
  promptId: z.string().uuid(),
  version: z.number().int().min(1),
  content: z.string().min(1),
  notes: z.string().optional(),
  createdBy: z.string().optional(),
  createdAt: z.string().optional(),
});

// CSV Row Schema for bulk import
export const CSVRowSchema = z.object({
  slug: z.string().min(1).max(120),
  title: z.string().min(1).max(120),
  short_description: z.string().max(200).optional(),
  content: z.string().min(1),
  category_slug: z.string().min(1),
  category_name: z.string().min(1).max(120),
  category_description: z.string().max(500).optional(),
  visibility: PlanTierEnum,
  status: PromptStatusEnum,
  tags: z.string().optional(),
  is_featured: z.string().optional(),
  sort_order: z.string().optional(),
  version: z.string().optional(),
});

// Types
export type Category = z.infer<typeof CategorySchema>;
export type Prompt = z.infer<typeof PromptSchema>;
export type PromptVersion = z.infer<typeof PromptVersionSchema>;
export type CSVRow = z.infer<typeof CSVRowSchema>;

// Import/Export types
export type ImportAction = 'INSERT' | 'UPDATE' | 'INVALID';

export interface ParsedRow extends CSVRow {
  _rowIndex: number;
  _action: ImportAction;
  _errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ImportSummary {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  insertCount: number;
  updateCount: number;
  categoriesCreated: string[];
}

export interface ImportOptions {
  autoCreateCategories: boolean;
  treatEmptyAsNoChange: boolean;
}