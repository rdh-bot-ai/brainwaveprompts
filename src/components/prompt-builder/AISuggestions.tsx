
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
    
    // Different suggestions based on prompt mode
    if (formData.buildCustom) {
      suggestions.push("You're in custom prompt mode. Be specific about what you want.");
      
      if (!formData.prompt || formData.prompt.length < 30) {
        suggestions.push("Start by clearly stating your request or goal in the prompt editor.");
      }
      
      // Task-specific custom mode suggestions
      switch (taskType) {
        case "content":
          suggestions.push("For content creation, specify target audience, tone, and desired length.");
          break;
        case "code":
          suggestions.push("For code, mention programming language, functionality, and performance requirements.");
          break;
        case "idea":
          suggestions.push("For ideation, define the problem space and any constraints to consider.");
          break;
        case "image":
          suggestions.push("For images, describe subject, style, mood, and composition details.");
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
