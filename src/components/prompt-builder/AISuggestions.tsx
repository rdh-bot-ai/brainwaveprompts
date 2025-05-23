
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
  // Generate context-aware suggestions based on the user's selections
  const getSuggestions = () => {
    const suggestions: string[] = [];

    // Keywords for contextual suggestions
    const translationKeywords = ["translate", "Spanish", "French", "German", "Japanese", "Chinese", "Italian", "Portuguese", "Russian", "Arabic", "Korean"];
    const summarizationKeywords = ["summarize", "tl;dr", "summary", "in brief", "short version"];
    const generalKeywords = [...translationKeywords, ...summarizationKeywords, "define", "explain", "code in", "write a story about", "what is", "how to"];

    // Analyze Prompt Content for keywords
    const promptText = formData.prompt?.toLowerCase() || "";

    // 1. Translation Example
    const mentionsTranslate = translationKeywords.some(keyword => promptText.includes(keyword));
    if (mentionsTranslate && taskType !== "translate") { // Assuming 'translate' could be a taskType
      suggestions.push("It looks like you're trying to translate something. Consider using a dedicated 'Translation' task/subcategory if available for more specific options, or ensure you specify 'source language' and 'target language' in your prompt.");
    }

    // 2. Summarization Example
    const mentionsSummarize = summarizationKeywords.some(keyword => promptText.includes(keyword));
    if (mentionsSummarize && promptText.length > 100) { // Check if text to summarize seems long
      suggestions.push("For summaries, ensure you specify the desired length or key aspects to focus on.");
    }

    // 3. Prompt Length/Complexity
    if (promptText.length > 500 && !formData.buildCustom) {
      suggestions.push("Your prompt is getting quite detailed! For more space and better control, you might want to switch to the 'Advanced Editor' or 'Build my own prompt' mode.");
    } else if (promptText.length > 300) { // General complexity check for long prompts
      let keywordCount = 0;
      generalKeywords.forEach(keyword => {
        if (promptText.includes(keyword)) {
          keywordCount++;
        }
      });
      if (keywordCount > 1) { // If prompt is long and uses multiple keywords, suggest breaking it down
        suggestions.push("This is a complex prompt. Consider breaking it down into smaller parts for the AI to handle more effectively.");
      }
    }
    
    // Different suggestions based on prompt mode
    if (formData.buildCustom) {
      suggestions.push("You're in custom prompt mode. You can write or modify prompts freely.");
      
      if (!formData.prompt || formData.prompt.length < 30) {
        suggestions.push("Start by clearly stating your request or goal in the prompt editor.");
        suggestions.push("Try using the advanced editor for more space when writing your prompt.");
      }
      
      // Task-specific custom mode suggestions
      switch (taskType) {
        case "content":
          suggestions.push("For content creation, specify target audience, tone, and desired length.");
          if (!formData.topic) {
            suggestions.push("Include a clear topic in your prompt for better content generation.");
          }
          break;
        case "code":
          suggestions.push("For code, mention programming language, functionality, and performance requirements.");
          if (!formData.language) {
            suggestions.push("Specify the programming language in your prompt.");
          }
          if (!formData.functionality) {
            suggestions.push("Describe what the code should do in your prompt.");
          }
          break;
        case "idea":
          suggestions.push("For ideation, define the problem space and any constraints to consider.");
          if (!formData.challenge) {
            suggestions.push("Clearly describe the challenge or problem you're addressing.");
          }
          break;
        case "image":
          suggestions.push("For images, describe subject, style, mood, and composition details.");
          if (!formData.subject) {
            suggestions.push("Detail what should appear in the image.");
          }
          if (!formData.style) {
            suggestions.push("Specify the artistic style for your image.");
          }
          break;
      }
      
      // Always suggest to use the form fields for guidance
      suggestions.push("Fill in the form fields below to help structure your custom prompt.");
    } else if (!formData.useTemplate) {
      suggestions.push("Consider using our template for better structure");
      suggestions.push("Remember to specify your desired tone and detail level");
    } else {
      // General template mode suggestions
      if (!formData.prompt || formData.prompt.length < 30) {
        suggestions.push("Fill in the basic details to see your template preview");
      }
    }
    
    // Task-specific suggestions for template mode
    if (formData.useTemplate) {
      switch (taskType) {
        case "content":
          if (!formData.topic || formData.topic.length < 5) {
            suggestions.push("Add a specific topic for better results");
          } else if (!formData.keyPoints && formData.useTemplate) {
            suggestions.push("Adding key points will make your content more structured");
          }
          
          // Check for target audience in content tasks
          if (!formData.targetAudience && taskType === "content") {
            suggestions.push("Specifying a target audience helps tailor the content appropriately");
          }
          break;
          
        case "code":
          if (!formData.language && formData.useTemplate) {
            suggestions.push("Selecting a programming language will help AI generate better code");
          }
          if (!formData.functionality || formData.functionality.length < 10) {
            suggestions.push("Describe the code functionality in detail for better results");
          }
          break;
          
        case "idea":
          if (!formData.challenge || formData.challenge.length < 10) {
            suggestions.push("Describe your challenge clearly to get more relevant ideas");
          }
          if (!formData.constraints && formData.useTemplate) {
            suggestions.push("Adding constraints helps focus the ideation process");
          }
          break;
          
        case "image":
          if (!formData.subject || formData.subject.length < 5) {
            suggestions.push("Describe what should be in the image for better results");
          }
          if (!formData.style && formData.useTemplate) {
            suggestions.push("Selecting an image style will guide the visual aesthetic");
          }
          if (!formData.details && formData.useTemplate) {
            suggestions.push("Adding visual details improves image generation quality");
          }
          break;
      }
    }
    
    // Tone and detail level suggestions
    if (!formData.tone) {
      suggestions.push("Selecting a tone helps AI match your communication style");
    }
    
    // For premium feature promotion
    if (!formData.includeExamples && suggestions.length < 4) {
      suggestions.push("Check 'Include Examples' for more practical, concrete outputs");
    }
    
    return suggestions.length > 0 ? suggestions : ["Your prompt is looking good! Click 'Enhance with AI' when ready."];
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
