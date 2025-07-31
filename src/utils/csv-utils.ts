import Papa from 'papaparse';
import { CSVRowSchema, ParsedRow, ImportAction, ValidationError, ImportSummary } from '@/types/prompt-management';
import { Prompt, Category } from '@/types/prompt-management';
import { sanitizeCsvCell, sanitizeFilename } from '@/utils/sanitization';

export const REQUIRED_CSV_HEADERS = [
  'slug', 'title', 'short_description', 'content', 'category_slug',
  'category_name', 'category_description', 'visibility', 'status',
  'tags', 'is_featured', 'sort_order', 'version'
];

// Maximum file size: 10MB
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
// Maximum number of rows
export const MAX_ROW_COUNT = 10000;

export interface CSVParseResult {
  data: Papa.ParseResult<any>['data'];
  errors: Papa.ParseError[];
  meta: Papa.ParseMeta;
}

export function parseCSV(file: File): Promise<CSVParseResult> {
  return new Promise((resolve, reject) => {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error(`File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`));
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Validate row count
        if (results.data.length > MAX_ROW_COUNT) {
          reject(new Error(`Row count exceeds maximum allowed rows of ${MAX_ROW_COUNT}`));
          return;
        }

        if (results.errors.length > 0) {
          // Return results with errors for better error handling
          resolve({
            data: results.data,
            errors: results.errors,
            meta: results.meta
          });
        } else {
          resolve({
            data: results.data,
            errors: [],
            meta: results.meta
          });
        }
      },
      error: (error) => reject(error)
    });
  });
}

export interface ProcessedRow extends ParsedRow {
  _rowIndex: number;
  _action: ImportAction;
  _errors: ValidationError[];
}

export function validateAndProcessRows(
  rawRows: CSVParseResult['data'],
  existingPrompts: Prompt[],
  existingCategories: Category[],
  autoCreateCategories: boolean
): ProcessedRow[] {
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

export function generateImportSummary(rows: ProcessedRow[]): ImportSummary {
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

export interface ExportData {
  [key: string]: any;
}

export function exportToCSV(data: ExportData[], filename: string) {
  // Sanitize data before export
  const sanitizedData = data.map(row => {
    const sanitizedRow: ExportData = {};
    Object.entries(row).forEach(([key, value]) => {
      sanitizedRow[key] = sanitizeCsvCell(String(value));
    });
    return sanitizedRow;
  });

  const csv = Papa.unparse(sanitizedData, {
    header: true
  });
  downloadBlob(csv, sanitizeFilename(filename), 'text/csv');
}

export function exportToJSON(data: ExportData[], filename: string) {
  const json = JSON.stringify(data, null, 2);
  downloadBlob(json, sanitizeFilename(filename), 'application/json');
}

export function downloadBlob(content: string, filename: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = sanitizeFilename(filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    // Always revoke the URL to prevent memory leaks
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
}

export function generateCleanCSV(rows: ProcessedRow[]): string {
  const validRows = rows.filter(r => r._action !== 'INVALID');
  const cleanData = validRows.map(row => {
    const { _rowIndex, _action, _errors, ...cleanRow } = row;
    // Sanitize each field
    const sanitizedRow: ExportData = {};
    Object.entries(cleanRow).forEach(([key, value]) => {
      sanitizedRow[key] = sanitizeCsvCell(String(value || ''));
    });
    return sanitizedRow;
  });
  return Papa.unparse(cleanData, { header: true });
}

export function generateErrorCSV(rows: ProcessedRow[]): string {
  const invalidRows = rows.filter(r => r._action === 'INVALID');
  const errorData = invalidRows.map(row => ({
    row: row._rowIndex,
    slug: sanitizeCsvCell(row.slug || ''),
    errors: sanitizeCsvCell(row._errors.map(e => `${e.field}: ${e.message}`).join('; '))
  }));
  return Papa.unparse(errorData, { header: true });
}