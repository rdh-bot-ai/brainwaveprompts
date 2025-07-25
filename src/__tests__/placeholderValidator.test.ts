import { describe, it, expect } from 'vitest';
import { 
  extractPlaceholders, 
  validatePlaceholders, 
  fixUseCasePlaceholders,
  validateFormData
} from '../utils/placeholderValidator';
import { SummarizePDFService } from '../services/SummarizePDF.service';
import type { UseCase } from '../data/useCases';

describe('placeholderValidator', () => {
  describe('extractPlaceholders', () => {
    it('should extract placeholders from template', () => {
      const template = "Create {type} content for {audience} with {tone} tone.";
      const placeholders = extractPlaceholders(template);
      expect(placeholders).toEqual(['type', 'audience', 'tone']);
    });

    it('should handle duplicate placeholders', () => {
      const template = "Use {keyword} in {keyword} optimization.";
      const placeholders = extractPlaceholders(template);
      expect(placeholders).toEqual(['keyword']);
    });

    it('should handle empty template', () => {
      const placeholders = extractPlaceholders('');
      expect(placeholders).toEqual([]);
    });
  });

  describe('validatePlaceholders', () => {
    it('should identify missing fields', () => {
      const useCase: UseCase = {
        id: 'test',
        name: 'Test',
        fields: [
          { id: 'topic', label: 'Topic', type: 'text', required: true }
        ],
        promptTemplate: 'Create content about {topic} for {audience}'
      };

      const validation = validatePlaceholders(useCase);
      expect(validation.missingFields).toEqual(['audience']);
      expect(validation.unusedFields).toEqual([]);
      expect(validation.isValid).toBe(false);
    });

    it('should identify unused fields', () => {
      const useCase: UseCase = {
        id: 'test',
        name: 'Test',
        fields: [
          { id: 'topic', label: 'Topic', type: 'text', required: true },
          { id: 'extra', label: 'Extra', type: 'text', required: true }
        ],
        promptTemplate: 'Create content about {topic}'
      };

      const validation = validatePlaceholders(useCase);
      expect(validation.missingFields).toEqual([]);
      expect(validation.unusedFields).toEqual(['extra']);
      expect(validation.isValid).toBe(true); // No missing fields
    });

    it('should validate perfect match', () => {
      const useCase: UseCase = {
        id: 'test',
        name: 'Test',
        fields: [
          { id: 'topic', label: 'Topic', type: 'text', required: true },
          { id: 'audience', label: 'Audience', type: 'text', required: true }
        ],
        promptTemplate: 'Create content about {topic} for {audience}'
      };

      const validation = validatePlaceholders(useCase);
      expect(validation.missingFields).toEqual([]);
      expect(validation.unusedFields).toEqual([]);
      expect(validation.isValid).toBe(true);
    });
  });

  describe('fixUseCasePlaceholders', () => {
    it('should add missing fields', () => {
      const useCase: UseCase = {
        id: 'test',
        name: 'Test',
        fields: [
          { id: 'topic', label: 'Topic', type: 'text', required: true }
        ],
        promptTemplate: 'Create content about {topic} for {audience}'
      };

      const fixed = fixUseCasePlaceholders(useCase);
      expect(fixed.fields).toHaveLength(2);
      expect(fixed.fields[1]).toEqual({
        id: 'audience',
        label: 'Audience',
        type: 'text',
        required: true
      });
    });

    it('should mark unused fields as optional', () => {
      const useCase: UseCase = {
        id: 'test',
        name: 'Test',
        fields: [
          { id: 'topic', label: 'Topic', type: 'text', required: true },
          { id: 'extra', label: 'Extra', type: 'text', required: true }
        ],
        promptTemplate: 'Create content about {topic}'
      };

      const fixed = fixUseCasePlaceholders(useCase);
      expect(fixed.fields[1].optional).toBe(true);
      expect(fixed.fields[1].tooltip).toBe('Not used in prompt yet');
    });
  });

  describe('validateFormData', () => {
    it('should return missing required fields', () => {
      const useCase: UseCase = {
        id: 'test',
        name: 'Test',
        fields: [
          { id: 'topic', label: 'Topic', type: 'text', required: true },
          { id: 'audience', label: 'Audience', type: 'text', required: true }
        ],
        promptTemplate: 'Create content about {topic} for {audience}'
      };

      const formData = { topic: 'AI' };
      const missing = validateFormData(formData, useCase);
      expect(missing).toEqual(['audience']);
    });

    it('should handle keywords field as array', () => {
      const useCase: UseCase = {
        id: 'seo',
        name: 'SEO',
        fields: [
          { id: 'keywords', label: 'Keywords', type: 'tags', required: true }
        ],
        promptTemplate: 'Optimize for {keywords}'
      };

      const formData = { keywords: ['seo', 'optimization'] };
      const missing = validateFormData(formData, useCase);
      expect(missing).toEqual([]);
    });
  });
});

describe('SummarizePDFService', () => {
  describe('splitByTokens', () => {
    it('should split text into chunks under token limit', async () => {
      const longText = 'a'.repeat(50000); // Very long text
      const chunks = await SummarizePDFService.splitByTokens(longText, 8000);
      
      expect(chunks.length).toBeGreaterThan(1);
      chunks.forEach(chunk => {
        expect(chunk.length).toBeLessThanOrEqual(8000 * 4); // 4 chars per token estimate
      });
    });

    it('should break at sentence boundaries when possible', async () => {
      const text = 'First sentence. Second sentence! Third sentence? Fourth sentence.';
      const chunks = await SummarizePDFService.splitByTokens(text, 50);
      
      chunks.forEach(chunk => {
        if (chunk.length > 0 && chunk !== chunks[chunks.length - 1]) {
          const lastChar = chunk.trim().slice(-1);
          expect(['.', '!', '?'].includes(lastChar)).toBe(true);
        }
      });
    });

    it('should handle empty text', async () => {
      const chunks = await SummarizePDFService.splitByTokens('', 8000);
      expect(chunks).toEqual([]);
    });
  });

  describe('processPDF', () => {
    it('should return truncated summary without API key', async () => {
      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      const result = await SummarizePDFService.processPDF(mockFile);
      
      expect(result.documentSummary).toBeDefined();
      expect(typeof result.documentSummary).toBe('string');
    });

    it('should handle processing errors gracefully', async () => {
      const mockFile = new File([''], 'error.pdf', { type: 'application/pdf' });
      const result = await SummarizePDFService.processPDF(mockFile);
      
      expect(result.documentSummary).toBeDefined();
      expect(result.documentSummary).toContain('error.pdf');
    });
  });
});