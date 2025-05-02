
import React, { useEffect } from "react";
import { TaskType } from "./TaskIcons";
import ContentForm from "./forms/ContentForm";
import CodeForm from "./forms/CodeForm";
import IdeaForm from "./forms/IdeaForm";
import ImageForm from "./forms/ImageForm";
import CommonForm from "./forms/CommonForm";
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

  // Effect to update prompt when relevant fields change
  useEffect(() => {
    if (selectedSubCategory) {
      let updatedPrompt = selectedSubCategory.defaultPrompt;
      
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
  }, [taskType, subCategory, formData.topic, formData.keyPoints, formData.language, formData.functionality, formData.challenge, formData.context, formData.constraints]);

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
          <Label className="font-medium text-sm text-gray-700">Template Preview</Label>
        </div>
        <Textarea
          value={formData.prompt || ""}
          onChange={(e) => onChange("prompt", e.target.value)}
          className="min-h-[120px] font-medium bg-white border-purple-100"
          placeholder="Your prompt template will appear here as you fill in the details below."
        />
        <p className="mt-2 text-xs text-gray-500">
          This is your prompt template. You can edit it directly or use the form fields below to customize it.
          Placeholders like [topic] will be automatically replaced with your inputs.
        </p>
      </div>

      {/* Task specific form inputs */}
      <div className="bg-white rounded-lg p-0">
        {renderTaskSpecificForm()}
        <CommonForm formData={formData} onChange={onChange} />
      </div>
    </div>
  );
};

export default PromptForm;
