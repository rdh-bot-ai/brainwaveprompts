
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
import { Sparkle, Pencil, File } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      // Only set the initial template, without adding any additional processing
      const basicTemplate = selectedSubCategory.defaultPrompt;
      
      // Only update if it's a new selection or template
      if (!formData.promptTemplate || formData.promptTemplate !== basicTemplate) {
        onChange("promptTemplate", basicTemplate);
        onChange("prompt", basicTemplate);
        onChange("useTemplate", true);
        onChange("buildCustom", false);
      }
    }
  }, [taskType, subCategory, selectedSubCategory, formData.promptTemplate, onChange]);
  
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
      formData.useTemplate, formData.buildCustom, onChange]);

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

  // Handle advanced editor changes
  const handleAdvancedEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange("prompt", newValue);
  };

  // Handle basic editor changes for custom prompt mode
  const handleBasicEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange("prompt", newValue);
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
      {/* Prompt Mode Selection */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="useTemplate" 
            checked={formData.useTemplate || false}
            onCheckedChange={handleUseTemplateChange} 
          />
          <Label htmlFor="useTemplate" className="text-sm font-medium text-gray-700">
            Use template structure (recommended)
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="buildCustom" 
            checked={formData.buildCustom || false} 
            onCheckedChange={handleBuildCustomPrompt} 
          />
          <Label htmlFor="buildCustom" className="text-sm font-medium text-gray-700">
            Build my own prompt
          </Label>
        </div>
      </div>

      {/* Prompt Editor Tabs */}
      <Tabs defaultValue={formData.defaultEditorTab || "basic"} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span>Basic Editor</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            <span>Advanced Editor</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          {/* Basic Template Preview */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <Sparkle className="h-4 w-4 text-purple-600 mr-2" />
              <Label className="font-medium text-sm text-gray-700">
                {formData.useTemplate ? "Template Preview" : formData.buildCustom ? "Custom Prompt" : "Prompt Preview"}
              </Label>
            </div>
            <Textarea
              value={formData.prompt || ""}
              onChange={handleBasicEditorChange}
              className={`min-h-[100px] font-medium ${formData.useTemplate ? "bg-white border-purple-100 whitespace-pre-line" : "bg-white border-purple-100"}`}
              placeholder={formData.useTemplate ? 
                "Your template preview will appear here as you fill in the details below." : 
                formData.buildCustom ? 
                "Write your custom prompt here..." :
                "Your prompt preview will appear here."
              }
              disabled={formData.useTemplate && !formData.buildCustom}
            />
            <p className="mt-2 text-xs text-gray-500">
              {formData.useTemplate ? 
                "Fill in the basic details using the form below. The template will update automatically." : 
                formData.buildCustom ?
                "You're building a custom prompt. The form fields below can help inspire your content." :
                "Your prompt preview will update as you make changes."
              }
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
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          {/* Advanced Custom Prompt Editor */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Pencil className="h-4 w-4 text-gray-700 mr-2" />
              <Label className="font-medium text-sm text-gray-700">
                {formData.useTemplate ? "Edit Template" : formData.buildCustom ? "Build Custom Prompt" : "Edit Prompt"}
              </Label>
            </div>
            <Textarea
              value={formData.prompt || ""}
              onChange={handleAdvancedEditorChange}
              className="min-h-[200px] font-medium border-gray-200 whitespace-pre-line"
              placeholder={formData.buildCustom ? 
                "Start building your custom prompt here..." : 
                "Enter your prompt here..."
              }
            />
            <p className="mt-2 text-xs text-gray-500">
              {formData.useTemplate ? 
                "You can edit the template directly here. This will override automatic updates from the form fields." : 
                formData.buildCustom ?
                "Create your prompt with complete creative freedom. The form fields below can still help structure your thoughts." :
                "Write your prompt with as much detail as needed. You can still use AI enhancement later."
              }
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Task specific form inputs */}
      <div className="bg-white rounded-lg p-0">
        {renderTaskSpecificForm()}
        <CommonForm formData={formData} onChange={onChange} />
      </div>
    </div>
  );
};

export default PromptForm;
