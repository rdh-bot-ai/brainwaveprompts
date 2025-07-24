
import React from "react";
import { Sparkle, Lightbulb } from "lucide-react";

interface AISuggestionsProps {
  taskType: string;
  subCategory: string;
  formData: Record<string, any>;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ 
  taskType, 
  subCategory, 
  formData 
}) => {
  // Generate highly dynamic, context-aware suggestions
  const getSuggestions = () => {
    const suggestions: string[] = [];
    
    // Core field suggestions - these are the most important
    if (!formData.topic) {
      suggestions.push("📝 Start with your main topic - this is the foundation of your prompt");
    }
    
    if (!formData.targetAudience) {
      suggestions.push("🎯 Define your target audience for more tailored content");
    }
    
    // Task and subcategory-specific suggestions
    if (taskType === "content") {
      switch (subCategory) {
        case "blog":
          if (!formData.keyPoints) {
            suggestions.push("💡 Add key points to structure your blog post sections");
          }
          if (!formData.tone) {
            suggestions.push("🎭 Choose a tone that matches your brand voice");
          }
          if (!formData.wordCount) {
            suggestions.push("📏 Set target word count for appropriate depth");
          }
          if (formData.topic && !formData.keyPoints) {
            suggestions.push("🔥 Pro tip: Break down your topic into 3-5 key sections for better structure");
          }
          break;
          
        case "article":
          if (!formData.researchDepth) {
            suggestions.push("🔬 Specify research depth for credible, well-sourced content");
          }
          if (!formData.sources && formData.researchDepth === "deep") {
            suggestions.push("📚 Mention preferred source types for academic-level articles");
          }
          if (formData.topic && formData.keyPoints) {
            suggestions.push("⭐ Great start! Consider adding research requirements for authority");
          }
          break;
          
        case "social":
          if (!formData.platforms) {
            suggestions.push("📱 Select target platforms to optimize format and length");
          }
          if (!formData.engagement) {
            suggestions.push("🎯 Define your engagement goal for focused messaging");
          }
          if (formData.platforms && formData.engagement) {
            suggestions.push("🚀 You're set! Each platform will get optimized content");
          }
          break;
          
        case "email":
          if (!formData.emailType) {
            suggestions.push("📧 Choose email type for appropriate structure and tone");
          }
          if (!formData.cta) {
            suggestions.push("👆 Add your call-to-action for better conversion");
          }
          if (formData.emailType && formData.cta) {
            suggestions.push("💌 Perfect! Your email will be conversion-optimized");
          }
          break;
          
        case "technical":
          if (!formData.audienceLevel) {
            suggestions.push("🎓 Set audience technical level for appropriate complexity");
          }
          if (!formData.prerequisites) {
            suggestions.push("⚙️ List prerequisites to set proper expectations");
          }
          if (formData.audienceLevel === "beginner" && !formData.prerequisites) {
            suggestions.push("🔰 For beginners, detailed prerequisites are essential");
          }
          break;
          
        case "script":
          if (!formData.duration) {
            suggestions.push("⏱️ Set video duration to control pacing and content depth");
          }
          if (!formData.platform) {
            suggestions.push("🎥 Choose platform for format-specific optimization");
          }
          if (formData.platform === "tiktok" && !formData.duration) {
            suggestions.push("⚡ TikTok works best with 30-60 second hooks");
          }
          break;
          
        case "newsletter":
          if (!formData.frequency) {
            suggestions.push("📅 Set frequency to establish reader expectations");
          }
          if (!formData.sections) {
            suggestions.push("📑 Define sections for consistent newsletter structure");
          }
          if (formData.frequency && formData.sections) {
            suggestions.push("📬 Excellent! Your newsletter will have professional structure");
          }
          break;
      }
    }
    
    // Other task types with dynamic suggestions
    else if (taskType === "code") {
      if (!formData.language) {
        suggestions.push("💻 Select programming language for syntax-specific code");
      }
      if (!formData.functionality) {
        suggestions.push("⚡ Describe functionality in detail for working code");
      }
      if (formData.language && formData.functionality) {
        suggestions.push("🎯 Ready to generate! Add context for production-ready code");
      }
    }
    
    else if (taskType === "idea") {
      if (!formData.challenge) {
        suggestions.push("🧩 Define your challenge clearly for targeted solutions");
      }
      if (formData.challenge && !formData.constraints) {
        suggestions.push("📐 Add constraints to focus ideation and get practical solutions");
      }
    }
    
    else if (taskType === "image") {
      if (!formData.subject) {
        suggestions.push("🎨 Describe your main subject for focused image generation");
      }
      if (!formData.style) {
        suggestions.push("🖼️ Choose artistic style for consistent visual aesthetic");
      }
      if (formData.subject && !formData.details) {
        suggestions.push("✨ Add visual details for richer, more specific images");
      }
    }
    
    // Common form enhancements
    if (formData.topic && formData.targetAudience && !formData.tone) {
      suggestions.push("🎵 You have great basics! A tone selection will perfect the voice");
    }
    
    if (!formData.includeExamples && formData.topic) {
      suggestions.push("💎 Enable 'Include Examples' for actionable, practical content");
    }
    
    // Advanced suggestions based on completion
    const completionFields = [formData.topic, formData.targetAudience, formData.keyPoints].filter(Boolean);
    if (completionFields.length >= 2) {
      suggestions.push("🔥 You're doing great! Your prompt is taking shape nicely");
    }
    
    // Provide encouragement and next steps
    if (suggestions.length === 0) {
      suggestions.push("✅ Excellent! Your prompt is well-structured and ready to generate amazing results");
      suggestions.push("🚀 Pro tip: Experiment with detail levels and examples for different output styles");
    }
    
    return suggestions;
  };
  
  const suggestions = getSuggestions();
  
  if (!taskType || !subCategory) {
    return null;
  }
  
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100">
      <div className="flex items-center mb-2">
        <Sparkle className="h-4 w-4 text-purple-600 mr-2" />
        <h3 className="font-medium text-sm text-gray-700">AI Suggestions</h3>
      </div>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
            <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AISuggestions;
