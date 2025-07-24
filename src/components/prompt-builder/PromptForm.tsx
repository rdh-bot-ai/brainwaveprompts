
import React, { useEffect } from "react";
import { TaskType } from "./TaskIcons";
import ContentForm from "./forms/ContentForm";
import CodeForm from "./forms/CodeForm";
import IdeaForm from "./forms/IdeaForm";
import ImageForm from "./forms/ImageForm";
import CommonForm from "./forms/CommonForm";
import AISuggestions from "./AISuggestions";
import { SUBCATEGORIES } from "./subcategories";
import { Label } from "@/components/ui/label";
import { Sparkle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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
    if (selectedSubCategory && !formData.buildCustom) {
      // Only set the initial template, without adding any additional processing
      const basicTemplate = selectedSubCategory.defaultPrompt;
      
      // Only update if it's a new selection or template
      if (!formData.promptTemplate || formData.promptTemplate !== basicTemplate) {
        console.log("Setting template from subcategory:", basicTemplate);
        onChange("promptTemplate", basicTemplate);
        onChange("prompt", basicTemplate);
        onChange("useTemplate", true);
        onChange("buildCustom", false);
      }
    }
  }, [taskType, subCategory, selectedSubCategory, formData.promptTemplate, onChange, formData.buildCustom]);
  
  // Effect to update template as user fills in form fields
  useEffect(() => {
    if (selectedSubCategory && formData.promptTemplate && formData.useTemplate && !formData.buildCustom) {
      let updatedPrompt = formData.promptTemplate;
      
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
      if (taskType === "image" && formData.subject) {
        updatedPrompt = updatedPrompt.replace(/\[subject\]/g, formData.subject);
      }
      if (taskType === "image" && formData.style) {
        updatedPrompt = updatedPrompt.replace(/\[style\]/g, formData.style);
      }
      if (taskType === "image" && formData.details) {
        updatedPrompt = updatedPrompt.replace(/\[details\]/g, formData.details);
      }
      if (taskType === "image" && formData.perspective) {
        updatedPrompt = updatedPrompt.replace(/\[perspective\]/g, formData.perspective);
      }
      if (taskType === "image" && formData.artReferences) {
        updatedPrompt = updatedPrompt.replace(/\[art references\]/g, formData.artReferences);
      }
      
      // Only update if something changed
      if (updatedPrompt !== formData.prompt) {
        onChange("prompt", updatedPrompt);
      }
    }
  }, [taskType, subCategory, formData.promptTemplate, formData.topic, formData.keyPoints, 
      formData.language, formData.functionality, formData.challenge, formData.context, 
      formData.constraints, formData.subject, formData.style, formData.details,
      formData.perspective, formData.artReferences,
      formData.useTemplate, formData.buildCustom, onChange, selectedSubCategory]);

  // Toggle between template and custom prompt
  const handleUseTemplateChange = (checked: boolean) => {
    // When enabling template mode
    if (checked) {
      onChange("useTemplate", true);
      onChange("buildCustom", false);
      
      // Switch to template mode but preserve any current content
      if (selectedSubCategory && (!formData.prompt || formData.buildCustom)) {
        onChange("promptTemplate", selectedSubCategory.defaultPrompt);
        onChange("prompt", selectedSubCategory.defaultPrompt);
      }
    } else {
      onChange("useTemplate", false);
    }
  };

  // Toggle between custom prompt and template
  const handleBuildCustomPrompt = (checked: boolean) => {
    // When enabling custom mode
    if (checked) {
      onChange("buildCustom", true);
      onChange("useTemplate", false);
      
      // Keep current prompt content for editing
      // This allows users to start with the template and modify it
    } else {
      onChange("buildCustom", false);
    }
  };

  // Handle editor changes
  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange("prompt", newValue);
  };

  // Render task-specific form based on task type and subcategory
  const renderTaskSpecificForm = () => {
    // Only show form if both task and subcategory are selected
    if (!taskType || !subCategory) {
      return null;
    }

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
      {/* Prompt Mode Selection - Only Template */}
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox 
          id="useTemplate" 
          checked={true}
          disabled={true}
        />
        <Label htmlFor="useTemplate" className="text-sm font-medium text-gray-700">
          Use template structure (always enabled)
        </Label>
      </div>

      {/* Prompt Editor */}
      <div className="bg-white rounded-lg border-2 border-dashed border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
            <Sparkle className="h-4 w-4 text-white" />
          </div>
          <div>
            <Label className="font-semibold text-gray-900">
              Template Preview
            </Label>
            <p className="text-xs text-gray-500 mt-1">
              Live preview updates as you fill the form below
            </p>
          </div>
        </div>
        <textarea
          value={formData.prompt || ""}
          onChange={handleEditorChange}
          className="min-h-[150px] w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
          placeholder="Your template will appear here as you complete the form..."
          disabled={true}
        />
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
      {(taskType && subCategory) && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="mb-4 pb-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm">Customize your prompt</h3>
            <p className="text-xs text-gray-500 mt-1">Fill in the details below to personalize your prompt</p>
          </div>
          {renderTaskSpecificForm()}
          <CommonForm formData={formData} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default PromptForm;
