import Papa from 'papaparse';
import { CSVRowSchema, ParsedRow, ImportAction, ValidationError, ImportSummary } from '@/types/prompt-management';
import { Prompt, Category } from '@/types/prompt-management';

export const REQUIRED_CSV_HEADERS = [
  'slug', 'title', 'short_description', 'content', 'category_slug',
  'category_name', 'category_description', 'visibility', 'status',
  'tags', 'is_featured', 'sort_order', 'version'
];

export function parseCSV(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(results.errors[0].message));
        } else {
          resolve(results.data);
        }
      },
      error: (error) => reject(error)
    });
  });
}

export function validateAndProcessRows(
  rawRows: any[],
  existingPrompts: Prompt[],
  existingCategories: Category[],
  autoCreateCategories: boolean
): ParsedRow[] {
  return rawRows.map((row, index) => {
    const errors: ValidationError[] = [];
    
    // Basic validation
    const validationResult = CSVRowSchema.safeParse(row);
    if (!validationResult.success) {
      validationResult.error.errors.forEach(err => {
        errors.push({
          field: err.path.join('.'),
          message: err.message
        });
      });
    }

    // Category validation
    if (!autoCreateCategories) {
      const categoryExists = existingCategories.some(c => c.slug === row.category_slug);
      if (!categoryExists) {
        errors.push({
          field: 'category_slug',
          message: 'Category does not exist and auto-create is disabled'
        });
      }
    }

    // Determine action
    let action: ImportAction = 'INVALID';
    if (errors.length === 0) {
      const existingPrompt = existingPrompts.find(p => p.slug === row.slug);
      action = existingPrompt ? 'UPDATE' : 'INSERT';
    }

    return {
      ...row,
      _rowIndex: index + 1,
      _action: action,
      _errors: errors
    };
  });
}

export function generateImportSummary(rows: ParsedRow[]): ImportSummary {
  const validRows = rows.filter(r => r._action !== 'INVALID');
  const insertCount = rows.filter(r => r._action === 'INSERT').length;
  const updateCount = rows.filter(r => r._action === 'UPDATE').length;
  
  const categoriesCreated = Array.from(
    new Set(
      rows
        .filter(r => r._action !== 'INVALID')
        .map(r => r.category_slug)
    )
  );

  return {
    totalRows: rows.length,
    validRows: validRows.length,
    invalidRows: rows.length - validRows.length,
    insertCount,
    updateCount,
    categoriesCreated
  };
}

export function exportToCSV(data: any[], filename: string) {
  const csv = Papa.unparse(data, {
    header: true
  });
  downloadBlob(csv, filename, 'text/csv');
}

export function exportToJSON(data: any[], filename: string) {
  const json = JSON.stringify(data, null, 2);
  downloadBlob(json, filename, 'application/json');
}

export function downloadBlob(content: string, filename: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateCleanCSV(rows: ParsedRow[]): string {
  const validRows = rows.filter(r => r._action !== 'INVALID');
  const cleanData = validRows.map(row => {
    const { _rowIndex, _action, _errors, ...cleanRow } = row;
    return cleanRow;
  });
  return Papa.unparse(cleanData, { header: true });
}

export function generateErrorCSV(rows: ParsedRow[]): string {
  const invalidRows = rows.filter(r => r._action === 'INVALID');
  const errorData = invalidRows.map(row => ({
    row: row._rowIndex,
    slug: row.slug || '',
    errors: row._errors.map(e => `${e.field}: ${e.message}`).join('; ')
  }));
  return Papa.unparse(errorData, { header: true });
}