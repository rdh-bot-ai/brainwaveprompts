/**
 * Centralized validation schemas for the application
 * Uses Zod for runtime type checking and validation
 */
import { z } from 'zod';

// Common password list to check against (in production, use a larger list or API)
const COMMON_PASSWORDS = [
  'password', 'password123', '12345678', '123456789', 'qwerty123',
  'welcome123', 'admin123', 'letmein', 'monkey123', 'dragon123'
];

/**
 * Password validation schema with comprehensive security requirements
 */
export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters long')
  .max(128, 'Password must not exceed 128 characters')
  .refine(
    (password) => /[A-Z]/.test(password),
    'Password must contain at least one uppercase letter'
  )
  .refine(
    (password) => /[a-z]/.test(password),
    'Password must contain at least one lowercase letter'
  )
  .refine(
    (password) => /[0-9]/.test(password),
    'Password must contain at least one number'
  )
  .refine(
    (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    'Password must contain at least one special character'
  )
  .refine(
    (password) => !COMMON_PASSWORDS.includes(password.toLowerCase()),
    'This password is too common. Please choose a more unique password'
  )
  .refine(
    (password) => !/(.)\1{2,}/.test(password),
    'Password must not contain more than 2 consecutive identical characters'
  );

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .max(254, 'Email must not exceed 254 characters')
  .toLowerCase()
  .transform((email) => email.trim());

/**
 * Name validation schema
 */
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters long')
  .max(100, 'Name must not exceed 100 characters')
  .regex(
    /^[a-zA-Z\s\-']+$/,
    'Name can only contain letters, spaces, hyphens, and apostrophes'
  )
  .transform((name) => name.trim());

/**
 * Sign up form validation schema
 */
export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

/**
 * Sign in form validation schema
 */
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
});

/**
 * CSV file validation schema
 */
export const csvFileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: 'File size must be less than 10MB'
    })
    .refine((file) => {
      const validTypes = ['text/csv', 'application/csv', 'text/plain'];
      return validTypes.includes(file.type) || file.name.endsWith('.csv');
    }, {
      message: 'File must be a CSV file'
    })
});

/**
 * Prompt content validation schema
 */
export const promptContentSchema = z
  .string()
  .min(10, 'Prompt must be at least 10 characters long')
  .max(10000, 'Prompt must not exceed 10,000 characters')
  .transform((content) => content.trim());

/**
 * Category validation schema
 */
export const categorySchema = z.object({
  id: z.string().uuid('Invalid category ID'),
  name: z.string().min(2).max(50),
  description: z.string().max(200).optional(),
  parentId: z.string().uuid().nullable().optional()
});

/**
 * Prompt validation schema
 */
export const promptSchema = z.object({
  id: z.string().uuid('Invalid prompt ID'),
  title: z.string().min(3).max(100),
  content: promptContentSchema,
  category: z.string().uuid(),
  subcategory: z.string().optional(),
  tier: z.enum(['free', 'registered', 'premium']),
  isActive: z.boolean().default(true),
  tags: z.array(z.string().max(30)).max(10).optional()
});

/**
 * Bulk import data validation
 */
export const bulkImportSchema = z.object({
  prompts: z.array(promptSchema).max(10000, 'Cannot import more than 10,000 prompts at once'),
  categories: z.array(categorySchema).max(1000, 'Cannot import more than 1,000 categories at once')
});

/**
 * Helper function to validate password strength
 * Returns a score from 0-5 and feedback messages
 */
export function getPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

  // Deduct points for patterns
  if (/(.)\1{2,}/.test(password)) {
    score--;
    feedback.push('Avoid repeated characters');
  }
  if (/^[0-9]+$/.test(password)) {
    score--;
    feedback.push('Don\'t use only numbers');
  }
  if (/^[a-zA-Z]+$/.test(password)) {
    score--;
    feedback.push('Include numbers and symbols');
  }

  // Normalize score to 0-5
  score = Math.max(0, Math.min(5, score));

  // Generate feedback based on missing criteria
  if (password.length < 12) feedback.push('Use at least 12 characters');
  if (!/[A-Z]/.test(password)) feedback.push('Include uppercase letters');
  if (!/[a-z]/.test(password)) feedback.push('Include lowercase letters');
  if (!/[0-9]/.test(password)) feedback.push('Include numbers');
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push('Include special characters');
  }

  return { score, feedback };
}

/**
 * Get password strength label
 */
export function getPasswordStrengthLabel(score: number): string {
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return labels[score] || 'Very Weak';
}

/**
 * Get password strength color for UI
 */
export function getPasswordStrengthColor(score: number): string {
  const colors = ['#dc2626', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981'];
  return colors[score] || colors[0];
}

/**
 * Prompt form validation schema
 */
export const promptFormSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters').max(200, 'Topic must not exceed 200 characters').optional(),
  keyPoints: z.string().min(10, 'Key points must be at least 10 characters').max(1000, 'Key points must not exceed 1000 characters').optional(),
  targetAudience: z.string().min(3, 'Target audience must be at least 3 characters').max(200, 'Target audience must not exceed 200 characters').optional(),
  context: z.string().max(500, 'Context must not exceed 500 characters').optional(),
  constraints: z.string().max(500, 'Constraints must not exceed 500 characters').optional(),
  tone: z.string().optional(),
  language: z.string().optional(),
  wordCount: z.string().optional(),
  duration: z.string().optional(),
  platform: z.string().optional(),
  platforms: z.string().optional(),
  style: z.string().optional(),
  details: z.string().max(500, 'Details must not exceed 500 characters').optional(),
  prompt: z.string().min(10, 'Prompt must be at least 10 characters').max(10000, 'Prompt must not exceed 10,000 characters').optional(),
  promptTemplate: z.string().optional(),
}).refine((data) => {
  // At least one of topic or prompt must be provided
  return data.topic || data.prompt;
}, {
  message: "Either topic or prompt content is required",
  path: ["topic"],
});

/**
 * Validate prompt form data
 */
export function validatePromptForm(formData: Record<string, any>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  try {
    promptFormSchema.parse(formData);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const field = err.path.join('.');
        errors[field] = err.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
}