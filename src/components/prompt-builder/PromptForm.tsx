
import React, { useEffect } from "react";
import { TaskType } from "./TaskIcons";
import ContentForm from "./forms/ContentForm";
import CodeForm from "./forms/CodeForm";
import IdeaForm from "./forms/IdeaForm";
import ImageForm from "./forms/ImageForm";
import CommonForm from "./forms/CommonForm";
import AISuggestions from "./AISuggestions";
import { SUBCATEGORIES } from "./subcategories";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkle } from "lucide-react";

interface PromptFormProps {
  taskType: TaskType;
  subCategory: string;
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

const PromptForm: React.FC<PromptFormProps> = ({ 
  taskType, 
  subCategory,
  formData, 
  onChange 
}) => {
  // Get the selected subcategory object
  const selectedSubCategory = SUBCATEGORIES[taskType]?.find(sub => sub.id === subCategory);
  
  // Effect to set initial prompt template when subcategory changes
  useEffect(() => {
    if (selectedSubCategory) {
      // Create a simplified template that only includes the basic structure
      const basicTemplate = getSimplifiedTemplate(selectedSubCategory.defaultPrompt, taskType);
      
      // Only update if it's a new selection or template
      if (!formData.promptTemplate || formData.promptTemplate !== basicTemplate) {
        onChange("promptTemplate", selectedSubCategory.defaultPrompt); // Store the full template for enhancement
        onChange("prompt", basicTemplate); // Show the simplified template to the user
      }
    }
  }, [taskType, selectedSubCategory, formData.promptTemplate, onChange]);
  
  // Effect to update template as user fills in form fields
  useEffect(() => {
    if (selectedSubCategory && formData.promptTemplate) {
      let updatedPrompt = getSimplifiedTemplate(selectedSubCategory.defaultPrompt, taskType);
      
      // Replace placeholders with actual values if they exist
      if (taskType === "content" && formData.topic) {
        updatedPrompt = updatedPrompt.replace(/\[topic\]/g, formData.topic);
      }
      if (formData.keyPoints) {
        updatedPrompt = updatedPrompt.replace(/\[key points\]/g, formData.keyPoints);
      }
      if (taskType === "code" && formData.language) {
        updatedPrompt = updatedPrompt.replace(/\[language\]/g, formData.language);
      }
      if (taskType === "code" && formData.functionality) {
        updatedPrompt = updatedPrompt.replace(/\[functionality\]/g, formData.functionality);
      }
      if (taskType === "idea" && formData.challenge) {
        updatedPrompt = updatedPrompt.replace(/\[challenge\]/g, formData.challenge);
      }
      if (formData.context) {
        updatedPrompt = updatedPrompt.replace(/\[context\]/g, formData.context);
      }
      if (formData.constraints) {
        updatedPrompt = updatedPrompt.replace(/\[constraints\]/g, formData.constraints);
      }
      
      // Only update if something changed
      if (updatedPrompt !== formData.prompt) {
        onChange("prompt", updatedPrompt);
      }
    }
  }, [taskType, subCategory, formData.promptTemplate, formData.topic, formData.keyPoints, formData.language, formData.functionality, formData.challenge, formData.context, formData.constraints, onChange]);

  // Helper function to simplify templates
  const getSimplifiedTemplate = (template: string, taskType: TaskType) => {
    // Extract just the first sentence or paragraph that contains the main request
    const lines = template.split('\n');
    let simplifiedTemplate = lines[0]; // Default to first line
    
    // For different task types, extract just what's needed from user
    switch (taskType) {
      case "content":
        return "Create content about [topic] that includes [key points].";
      case "code":
        return "Write [language] code that [functionality].";
      case "idea":
        return "Generate ideas for [challenge].";
      case "image":
        return "Create an image prompt for [subject] with [details].";
      default:
        // If we can't determine a specific format, use first paragraph
        const firstParagraph = template.split('\n\n')[0];
        return firstParagraph || template;
    }
  };

  // Render task-specific form based on task type
  const renderTaskSpecificForm = () => {
    switch (taskType) {
      case "content":
        return <ContentForm formData={formData} onChange={onChange} />;
      case "code":
        return <CodeForm formData={formData} onChange={onChange} />;
      case "idea":
        return <IdeaForm formData={formData} onChange={onChange} />;
      case "image":
        return <ImageForm formData={formData} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Template Preview */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
        <div className="flex items-center mb-2">
          <Sparkle className="h-4 w-4 text-purple-600 mr-2" />
          <Label className="font-medium text-sm text-gray-700">Basic Template</Label>
        </div>
        <Textarea
          value={formData.prompt || ""}
          onChange={(e) => onChange("prompt", e.target.value)}
          className="min-h-[100px] font-medium bg-white border-purple-100 whitespace-pre-line"
          placeholder="Your prompt template will appear here as you fill in the details below."
        />
        <p className="mt-2 text-xs text-gray-500">
          Fill in only the essential details above. When you generate the enhanced prompt,
          we'll use AI to expand this into a comprehensive, detailed prompt.
        </p>
      </div>

      {/* AI Suggestions */}
      {taskType && subCategory && (
        <AISuggestions 
          taskType={taskType} 
          subCategory={subCategory} 
          formData={formData} 
        />
      )}

      {/* Task specific form inputs */}
      <div className="bg-white rounded-lg p-0">
        {renderTaskSpecificForm()}
        <CommonForm formData={formData} onChange={onChange} />
      </div>
    </div>
  );
};

export default PromptForm;
