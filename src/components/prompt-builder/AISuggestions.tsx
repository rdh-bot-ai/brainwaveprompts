
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
    
    // General suggestions
    if (!formData.prompt || formData.prompt.length < 50) {
      suggestions.push("Add more details to your prompt for better results");
    }
    
    // Task-specific suggestions
    switch (taskType) {
      case "content":
        if (formData.topic) {
          suggestions.push(`Consider specifying your target audience for "${formData.topic}"`);
          
          if (!formData.keyPoints) {
            suggestions.push("Adding key points will make your content more structured");
          }
        }
        break;
        
      case "code":
        if (formData.language) {
          suggestions.push(`When requesting ${formData.language} code, specify version requirements if applicable`);
          suggestions.push("Consider asking for code comments to improve understanding");
        }
        break;
        
      case "idea":
        if (formData.challenge) {
          suggestions.push("Consider adding constraints to focus your ideation process");
          suggestions.push("Specify if you want practical ideas or more creative concepts");
        }
        break;
        
      case "image":
        suggestions.push("Include details about lighting, perspective, and style for better image prompts");
        suggestions.push("Reference specific art styles or artists for more consistent results");
        break;
        
      case "research":
        suggestions.push("Specify the depth of research needed (overview vs. detailed analysis)");
        suggestions.push("Include time period constraints if researching historical topics");
        break;
    }
    
    // Subcategory-specific suggestions
    if (taskType === "content" && subCategory === "blog") {
      suggestions.push("Consider specifying your desired word count");
      suggestions.push("Mention if you want SEO optimization for your blog content");
    }
    
    if (taskType === "code" && subCategory === "function") {
      suggestions.push("Specify input parameters and expected outputs");
      suggestions.push("Mention error handling preferences");
    }
    
    return suggestions.length > 0 ? suggestions : ["Your prompt looks good!"];
  };
  
  const suggestions = getSuggestions();
  
  if (!taskType || !subCategory) {
    return null;
  }
  
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100 mt-4">
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
