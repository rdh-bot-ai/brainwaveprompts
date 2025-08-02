/**
 * AI Service for GPT Integration
 * Handles prompt enhancement with different models based on user plans
 */

import { Plan, getAIModel } from '@/config/planMatrix';

export interface AIEnhancementOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface AIResponse {
  enhancedPrompt: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

class AIService {
  private apiKey: string | null = null;

  constructor() {
    // Get API key from environment variable
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
    
    if (!this.apiKey && process.env.NODE_ENV === 'development') {
      console.warn('OpenAI API key not found. Set VITE_OPENAI_API_KEY environment variable.');
    }
  }

  /**
   * Enhance a prompt using GPT based on user's plan
   */
  async enhancePrompt(
    originalPrompt: string,
    userPlan: Plan,
    options: AIEnhancementOptions = {}
  ): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const model = getAIModel(userPlan);
    const {
      temperature = 0.7,
      maxTokens = 2000,
      topP = 1.0,
      frequencyPenalty = 0.0,
      presencePenalty = 0.0,
    } = options;

    const systemPrompt = this.getSystemPrompt(userPlan);
    const enhancementPrompt = this.buildEnhancementPrompt(originalPrompt);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: enhancementPrompt }
          ],
          temperature,
          max_tokens: maxTokens,
          top_p: topP,
          frequency_penalty: frequencyPenalty,
          presence_penalty: presencePenalty,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from OpenAI API');
      }

      return {
        enhancedPrompt: data.choices[0].message.content.trim(),
        model,
        usage: data.usage ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        } : undefined,
      };
    } catch (error) {
      // Log error in development only
      if (process.env.NODE_ENV === 'development') {
        console.error('AI Enhancement Error:', error);
      }
      
      // Return fallback enhanced prompt for graceful degradation
      return {
        enhancedPrompt: this.getFallbackEnhancement(originalPrompt),
        model: 'fallback',
      };
    }
  }

  /**
   * Get system prompt based on user plan
   */
  private getSystemPrompt(plan: Plan): string {
    const basePrompt = `You are an expert prompt engineer. Your task is to enhance and optimize prompts to get better results from AI models.`;
    
    switch (plan) {
      case 'FREE_TIER':
        return `${basePrompt} Provide basic improvements focusing on clarity and structure. Keep enhancements concise.`;
      
      case 'REGISTERED':
        return `${basePrompt} Provide good improvements including better structure, clarity, and some advanced techniques like examples and context.`;
      
      case 'PREMIUM':
        return `${basePrompt} Provide comprehensive prompt optimization using advanced techniques like:
        - Chain-of-thought reasoning
        - Few-shot examples
        - Role-based prompting
        - Context enhancement
        - Output format specification
        - Edge case handling
        Make the prompt as effective as possible for achieving the user's goals.`;
      
      default:
        return basePrompt;
    }
  }

  /**
   * Build the enhancement prompt
   */
  private buildEnhancementPrompt(originalPrompt: string): string {
    return `Please enhance the following prompt to make it more effective and get better results from AI models:

Original Prompt:
"""
${originalPrompt}
"""

Enhanced Prompt:`;
  }

  /**
   * Fallback enhancement for when API is unavailable
   */
  private getFallbackEnhancement(originalPrompt: string): string {
    // Basic template-based enhancement
    let enhanced = originalPrompt;
    
    // Add structure if missing
    if (!enhanced.includes('\n\n')) {
      enhanced = `Please help me with the following request:\n\n${enhanced}\n\nPlease provide a clear and detailed response.`;
    }
    
    // Add context instruction if very short
    if (enhanced.length < 50) {
      enhanced = `${enhanced}\n\nPlease provide step-by-step guidance and include relevant examples where helpful.`;
    }
    
    return enhanced;
  }

  /**
   * Check if AI service is available
   */
  isAvailable(): boolean {
    return this.apiKey !== null;
  }

  /**
   * Get available models for testing
   */
  getAvailableModels(): string[] {
    return ['gpt-3.5-turbo', 'gpt-4-turbo'];
  }
}

// Export singleton instance
export const aiService = new AIService();
export default aiService;