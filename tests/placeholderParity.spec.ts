import { describe, it, expect } from 'vitest';
import { USE_CASES } from '../src/data/useCases';
import { extractPlaceholders } from '../src/utils/placeholderValidator';

describe('Placeholder Parity Tests', () => {
  it('should have matching placeholders and fields for all use cases', () => {
    const errors: string[] = [];

    USE_CASES.forEach(useCase => {
      const templatePlaceholders = extractPlaceholders(useCase.promptTemplate);
      const fieldIds = useCase.fields.map(field => field.id);
      
      // Find missing fields (placeholders without corresponding fields)
      const missingFields = templatePlaceholders.filter(placeholder => 
        !fieldIds.includes(placeholder)
      );
      
      // Find unused fields (fields without corresponding placeholders)
      const unusedFields = fieldIds.filter(fieldId => 
        !templatePlaceholders.includes(fieldId)
      );

      if (missingFields.length > 0) {
        errors.push(`${useCase.name}: Missing fields for placeholders: ${missingFields.join(', ')}`);
      }

      if (unusedFields.length > 0) {
        errors.push(`${useCase.name}: Unused fields: ${unusedFields.join(', ')}`);
      }
    });

    if (errors.length > 0) {
      throw new Error(`Placeholder parity errors:\n${errors.join('\n')}`);
    }

    expect(errors.length).toBe(0);
  });

  it('should have all required fields present', () => {
    USE_CASES.forEach(useCase => {
      const templatePlaceholders = extractPlaceholders(useCase.promptTemplate);
      const requiredFields = useCase.fields.filter(field => field.required).map(field => field.id);
      
      const missingRequiredFields = templatePlaceholders.filter(placeholder => {
        const field = useCase.fields.find(f => f.id === placeholder);
        return field && field.required && !requiredFields.includes(placeholder);
      });

      expect(missingRequiredFields).toHaveLength(0);
    });
  });

  it('should properly handle array fields like keywords', () => {
    const seoCase = USE_CASES.find(uc => uc.id === 'seo-keyword-cluster');
    if (seoCase) {
      const keywordsField = seoCase.fields.find(field => field.id === 'keywords');
      expect(keywordsField?.type).toBe('tags'); // Should be tags type for arrays
      
      const templatePlaceholders = extractPlaceholders(seoCase.promptTemplate);
      expect(templatePlaceholders).toContain('keywords');
    }
  });

  it('should have documentSummary placeholder for PDF use case', () => {
    const pdfCase = USE_CASES.find(uc => uc.id === 'summarize-pdf');
    if (pdfCase) {
      const templatePlaceholders = extractPlaceholders(pdfCase.promptTemplate);
      expect(templatePlaceholders).toContain('documentSummary');
      expect(templatePlaceholders).not.toContain('document_text'); // Should not use old placeholder
    }
  });

  it('should have cta field for Blog Post SME use case', () => {
    const blogCase = USE_CASES.find(uc => uc.id === 'blog-post-sme');
    if (blogCase) {
      const ctaField = blogCase.fields.find(field => field.id === 'cta');
      expect(ctaField).toBeDefined();
      expect(ctaField?.required).toBe(true);
      
      const templatePlaceholders = extractPlaceholders(blogCase.promptTemplate);
      expect(templatePlaceholders).toContain('cta');
    }
  });

  it('should have offer field for Cold Email B2B use case', () => {
    const emailCase = USE_CASES.find(uc => uc.id === 'cold-email-b2b');
    if (emailCase) {
      const offerField = emailCase.fields.find(field => field.id === 'offer');
      expect(offerField).toBeDefined();
      expect(offerField?.required).toBe(true);
      
      const templatePlaceholders = extractPlaceholders(emailCase.promptTemplate);
      expect(templatePlaceholders).toContain('offer');
    }
  });
});