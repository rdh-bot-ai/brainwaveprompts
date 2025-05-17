
import React, { useEffect, useState } from "react";
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Generate context-aware suggestions based on the user's selections
  useEffect(() => {
    const newSuggestions: string[] = [];
    
    // General suggestions
    if (!formData.prompt || formData.prompt.length < 20) {
      newSuggestions.push("Add essential details to your prompt for better results");
    }
    
    // Task-specific suggestions
    switch (taskType) {
      case "content":
        if (!formData.topic) {
          newSuggestions.push("Adding a clear topic is essential for content generation");
        } else {
          newSuggestions.push(`Consider your target audience for "${formData.topic}"`);
          
          if (!formData.keyPoints) {
            newSuggestions.push("Adding key points will make your content more structured");
          }
        }
        break;
        
      case "code":
        if (!formData.language) {
          newSuggestions.push("Specify a programming language for your code");
        } else {
          newSuggestions.push(`For ${formData.language} code, specify version requirements if applicable`);
        }
        
        if (!formData.functionality) {
          newSuggestions.push("Describe what your code should do");
        }
        break;
        
      case "idea":
        if (!formData.challenge) {
          newSuggestions.push("Define the challenge you need ideas for");
        } else {
          newSuggestions.push("Consider adding constraints to focus your ideation process");
        }
        break;
        
      case "image":
        if (!formData.subject) {
          newSuggestions.push("Describe the main subject of your desired image");
        }
        
        if (!formData.style) {
          newSuggestions.push("Selecting a visual style will improve your image results");
        }
        
        if (!formData.details) {
          newSuggestions.push("Include details about lighting, perspective, and mood for better image prompts");
        }
        break;
    }
    
    // Subcategory-specific suggestions
    if (taskType === "content" && subCategory === "blog" && formData.topic) {
      newSuggestions.push("Consider specifying your desired word count for the blog post");
    }
    
    if (taskType === "code" && subCategory === "function" && formData.functionality) {
      newSuggestions.push("Specify input parameters and expected outputs");
    }
    
    setSuggestions(newSuggestions.length > 0 ? newSuggestions : ["Your prompt is ready for enhancement!"]);
  }, [taskType, subCategory, formData]);
  
  if (!taskType || !subCategory) {
    return null;
  }
  
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-100 mt-4">
      <div className="flex items-center mb-2">
        <Sparkle className="h-4 w-4 text-amber-500 mr-2" />
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
