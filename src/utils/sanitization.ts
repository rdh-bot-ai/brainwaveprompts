/**
 * Input sanitization utilities to prevent XSS attacks
 * This module provides functions to sanitize user input before interpolation
 */

/**
 * Sanitizes HTML content by escaping dangerous characters
 * Prevents XSS attacks when rendering user content
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitizes user input for safe interpolation into templates
 * Removes potential script injections while preserving legitimate content
 */
export function sanitizeTemplateInput(input: string): string {
  if (!input) return '';
  
  // Remove script tags and event handlers
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Remove potentially dangerous HTML tags but keep safe formatting
  const dangerousTags = /<(iframe|object|embed|link|style|base|form)[^>]*>/gi;
  sanitized = sanitized.replace(dangerousTags, '');
  
  return sanitized.trim();
}

/**
 * Sanitizes filename to prevent path traversal attacks
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return 'download';
  
  // Remove path traversal attempts
  let safe = filename.replace(/\.\./g, '');
  safe = safe.replace(/[\/\\]/g, '_');
  
  // Remove special characters except common ones
  safe = safe.replace(/[^a-zA-Z0-9._\- ]/g, '');
  
  // Limit length
  if (safe.length > 255) {
    safe = safe.substring(0, 255);
  }
  
  return safe || 'download';
}

/**
 * Validates and sanitizes URL input
 * Prevents javascript: and data: URLs that could execute code
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  const trimmed = url.trim();
  
  // Block dangerous protocols
  const dangerousProtocols = /^(javascript|data|vbscript|file):/i;
  if (dangerousProtocols.test(trimmed)) {
    return '';
  }
  
  // Ensure URL starts with http(s) or is relative
  if (!/^https?:\/\//i.test(trimmed) && !/^\//.test(trimmed)) {
    return '';
  }
  
  return trimmed;
}

/**
 * Sanitizes CSV content to prevent formula injection
 * Prevents Excel/Google Sheets formula execution via CSV
 */
export function sanitizeCsvCell(content: string): string {
  if (!content) return '';
  
  const str = String(content);
  
  // Check if content starts with dangerous characters
  const dangerousStarts = ['=', '+', '-', '@', '\t', '\r'];
  if (dangerousStarts.some(char => str.startsWith(char))) {
    // Prefix with single quote to prevent formula execution
    return `'${str}`;
  }
  
  return str;
}

/**
 * Strips all HTML tags from input
 * Useful for plain text contexts where no formatting is allowed
 */
export function stripHtmlTags(input: string): string {
  if (!input) return '';
  
  return input.replace(/<[^>]*>/g, '');
}

/**
 * Validates and sanitizes email input
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  // Basic email validation and sanitization
  const trimmed = email.trim().toLowerCase();
  
  // Remove any HTML tags or script attempts
  const sanitized = stripHtmlTags(trimmed);
  
  // Basic email pattern check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(sanitized)) {
    return '';
  }
  
  return sanitized;
}