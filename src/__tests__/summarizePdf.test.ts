import { describe, it, expect } from 'vitest';
import { summarisePdf } from '../services/summarizePdf';
import { SummarizePDFService } from '../services/SummarizePDF.service';

describe('summarisePdf', () => {
  it('should throw error for files larger than 5MB', async () => {
    // Create a mock file larger than 5MB
    const largeContent = new Array(6 * 1024 * 1024).fill('a').join(''); // 6MB of 'a's
    const largeFile = new File([largeContent], 'large.pdf', { type: 'application/pdf' });
    
    await expect(summarisePdf(largeFile)).rejects.toThrow('File too large (>5 MB)');
  });

  it('should accept files under 5MB', async () => {
    // Create a mock file under 5MB  
    const smallContent = 'small pdf content';
    const smallFile = new File([smallContent], 'small.pdf', { type: 'application/pdf' });
    
    // Should not throw
    const result = await summarisePdf(smallFile);
    expect(typeof result).toBe('string');
  });
});

describe('SummarizePDFService.processPDF', () => {
  it('should throw error for files larger than 5MB', async () => {
    // Create a mock file larger than 5MB
    const largeContent = new Array(6 * 1024 * 1024).fill('a').join(''); // 6MB of 'a's
    const largeFile = new File([largeContent], 'large.pdf', { type: 'application/pdf' });
    
    const result = await SummarizePDFService.processPDF(largeFile);
    expect(result.documentSummary).toContain('File too large');
  });

  it('should process files under 5MB', async () => {
    // Create a mock file under 5MB
    const smallContent = 'small pdf content';
    const smallFile = new File([smallContent], 'small.pdf', { type: 'application/pdf' });
    
    const result = await SummarizePDFService.processPDF(smallFile);
    expect(result.documentSummary).toBeDefined();
    expect(typeof result.documentSummary).toBe('string');
  });
});