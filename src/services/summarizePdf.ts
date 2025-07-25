import { SummarizePDFService } from './SummarizePDF.service';

export async function summarisePdf(file: File): Promise<string> {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File too large (>5 MB)');
  }

  // Extract text from PDF (currently uses placeholder implementation)
  const text = await SummarizePDFService.pdfToText(file);
  
  // Check token limit (120k tokens ≈ 480k chars)
  if (text.length / 4 > 120_000) {
    throw new Error('PDF exceeds token limit (120k tokens)');
  }

  // Split into manageable chunks
  const chunks = await SummarizePDFService.splitByTokens(text, SummarizePDFService.MAX_TOKENS);
  
  // For now, return the first chunk with truncation as we don't have API key integration
  // In a real implementation, this would use the OpenAI API to summarize each chunk
  const firstChunk = chunks[0] || '';
  const summary = firstChunk.length > 1000 
    ? firstChunk.substring(0, 1000) + '...' 
    : firstChunk;
    
  return summary;
}

export { SummarizePDFService };