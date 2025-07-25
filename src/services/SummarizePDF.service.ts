interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class SummarizePDFService {
  public static readonly MAX_TOKENS = 8000;
  private static readonly OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

  static async splitByTokens(text: string, maxTokens: number): Promise<string[]> {
    // Rough estimation: 1 token ≈ 4 characters
    const approxCharsPerToken = 4;
    const maxChars = maxTokens * approxCharsPerToken;
    
    const chunks: string[] = [];
    let currentIndex = 0;
    
    while (currentIndex < text.length) {
      const endIndex = Math.min(currentIndex + maxChars, text.length);
      let chunk = text.substring(currentIndex, endIndex);
      
      // Try to break at sentence boundaries
      if (endIndex < text.length) {
        const lastSentenceEnd = Math.max(
          chunk.lastIndexOf('.'),
          chunk.lastIndexOf('!'),
          chunk.lastIndexOf('?')
        );
        
        if (lastSentenceEnd > chunk.length * 0.5) {
          chunk = chunk.substring(0, lastSentenceEnd + 1);
          currentIndex += lastSentenceEnd + 1;
        } else {
          currentIndex = endIndex;
        }
      } else {
        currentIndex = endIndex;
      }
      
      chunks.push(chunk.trim());
    }
    
    return chunks.filter(chunk => chunk.length > 0);
  }

  static async summarizeChunk(chunk: string, apiKey: string): Promise<string> {
    try {
      const response = await fetch(this.OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            {
              role: 'system',
              content: 'You are a precise document summarizer. Summarize the following text chunk concisely while preserving key information.'
            },
            {
              role: 'user',
              content: `Summarize this text chunk:\n\n${chunk}`
            }
          ],
          max_tokens: 500,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error summarizing chunk:', error);
      return chunk.substring(0, 200) + '...'; // Fallback to truncation
    }
  }

  static async pdfToText(file: File): Promise<string> {
    // This would typically use a PDF parsing library
    // For now, return a placeholder that works with the chunking system
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // In a real implementation, this would parse the PDF
        // For now, we'll simulate extracted text
        resolve(`PDF content from ${file.name}: This is extracted text content that would be much longer in a real PDF file...`);
      };
      reader.readAsText(file);
    });
  }

  static async processPDF(file: File, apiKey?: string): Promise<{ documentSummary: string }> {
    try {
      // Guard against large files (>5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File too large (max 5MB)');
      }

      const text = await this.pdfToText(file);
      
      // Guard against token limit (>120k tokens ≈ 480k chars)
      if (text.length > 480000) {
        throw new Error('PDF exceeds token limit (120k tokens)');
      }

      const chunks = await this.splitByTokens(text, this.MAX_TOKENS);
      
      if (!apiKey) {
        // Return truncated version if no API key
        return { documentSummary: chunks[0]?.substring(0, 1000) + '...' || '' };
      }
      
      const summaries = await Promise.all(
        chunks.map(chunk => this.summarizeChunk(chunk, apiKey))
      );
      
      return { documentSummary: summaries.join(' ') };
    } catch (error) {
      console.error('Error processing PDF:', error);
      if (error instanceof Error) {
        return { documentSummary: `Error: ${error.message}` };
      }
      return { documentSummary: `Error processing PDF: ${file.name}` };
    }
  }
}