import Papa from 'papaparse';
import { z } from 'zod';
import { CSVRowSchema, PromptSchema, ValidationError, ParsedCSVResult, Prompt, PlanTier, PromptStatus } from '@/types/admin-types';

// Required CSV headers
export const REQUIRED_CSV_HEADERS = [
  'slug',
  'title', 
  'short_description',
  'content',
  'category_slug',
  'category_name',
  'category_description',
  'visibility',
  'status',
  'tags',
  'is_featured',
  'sort_order',
  'version'
];

export const parseCSVFile = (file: File): Promise<ParsedCSVResult> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parseResult = parseCSVData(results.data as any[]);
        resolve(parseResult);
      },
      error: () => {
        resolve({
          validRows: [],
          invalidRows: [{ row: 0, field: 'file', message: 'Failed to parse CSV file', value: file.name }],
          totalRows: 0,
          categoriesDetected: [],
        });
      }
    });
  });
};

export const parseCSVData = (data: any[]): ParsedCSVResult => {
  const validRows: Prompt[] = [];
  const invalidRows: ValidationError[] = [];
  const categoriesDetected = new Set<string>();

  data.forEach((row, index) => {
    try {
      // First validate the raw CSV structure
      const csvRow = CSVRowSchema.parse(row);
      
      // Transform CSV row to Prompt object
      const promptData = transformCSVRowToPrompt(csvRow, index + 1);
      
      // Validate the transformed prompt
      const validPrompt = PromptSchema.parse(promptData);
      
      validRows.push(validPrompt);
      categoriesDetected.add(validPrompt.category_slug);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          invalidRows.push({
            row: index + 1,
            field: err.path.join('.'),
            message: err.message,
            value: err.path.reduce((obj, key) => obj?.[key], row),
          });
        });
      } else {
        invalidRows.push({
          row: index + 1,
          field: 'unknown',
          message: 'Unknown parsing error',
          value: row,
        });
      }
    }
  });

  return {
    validRows,
    invalidRows,
    totalRows: data.length,
    categoriesDetected: Array.from(categoriesDetected),
  };
};

const transformCSVRowToPrompt = (csvRow: any, rowNumber: number): Prompt => {
  // Parse tags (split by | or , and trim)
  const tags = csvRow.tags 
    ? csvRow.tags.split(/[|,]/).map((tag: string) => tag.trim()).filter(Boolean)
    : [];

  // Parse boolean values
  const parseBoolean = (value: string): boolean => {
    return value?.toLowerCase() === 'true';
  };

  // Parse numbers with defaults
  const parseNumber = (value: string, defaultValue: number): number => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  };

  // Validate enums
  const visibility = PlanTier.parse(csvRow.visibility?.toUpperCase());
  const status = PromptStatus.parse(csvRow.status?.toUpperCase());

  return {
    slug: csvRow.slug,
    title: csvRow.title,
    short_description: csvRow.short_description || undefined,
    content: csvRow.content,
    category_slug: csvRow.category_slug,
    category_name: csvRow.category_name || undefined,
    category_description: csvRow.category_description || undefined,
    visibility,
    status,
    tags,
    is_featured: parseBoolean(csvRow.is_featured),
    sort_order: parseNumber(csvRow.sort_order, 0),
    version: parseNumber(csvRow.version, 1),
  };
};

export const generateCleanCSV = (validRows: Prompt[]): string => {
  const headers = REQUIRED_CSV_HEADERS;
  
  const csvRows = validRows.map(prompt => [
    prompt.slug,
    prompt.title,
    prompt.short_description || '',
    prompt.content,
    prompt.category_slug,
    prompt.category_name || '',
    prompt.category_description || '',
    prompt.visibility,
    prompt.status,
    prompt.tags.join('|'),
    prompt.is_featured.toString(),
    prompt.sort_order.toString(),
    prompt.version.toString(),
  ]);

  return Papa.unparse({
    fields: headers,
    data: csvRows,
  });
};

export const generateErrorCSV = (errors: ValidationError[]): string => {
  const headers = ['row', 'field', 'message', 'value'];
  
  const csvRows = errors.map(error => [
    error.row.toString(),
    error.field,
    error.message,
    error.value?.toString() || '',
  ]);

  return Papa.unparse({
    fields: headers,
    data: csvRows,
  });
};

export const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Sample CSV content for download
export const SAMPLE_CSV_CONTENT = `slug,title,short_description,content,category_slug,category_name,category_description,visibility,status,tags,is_featured,sort_order,version
test-prompt-1,Test Prompt 1,A test prompt for validation,Create content about [topic] for [audience],content-writing,Content Writing,Content creation templates,FREE,PUBLISHED,test|content,true,1,1
test-prompt-2,Test Prompt 2,Another test prompt,Write a social media post about [product] for [platform],social-media,Social Media,Social media templates,PREMIUM,DRAFT,social|test,false,2,1
invalid-prompt,Invalid Prompt,Missing content field,,business,Business,Business templates,INVALID_TIER,PUBLISHED,business,false,3,abc`;