
import React, { useEffect } from "react";
import { TaskType } from "./TaskIcons";
import ContentForm from "./forms/ContentForm";
import CodeForm from "./forms/CodeForm";
import IdeaForm from "./forms/IdeaForm";
import ImageForm from "./forms/ImageForm";
import EmailForm from "./forms/EmailForm";
import ResearchForm from "./forms/ResearchForm";
import SEOForm from "./forms/SEOForm";
import DataForm from "./forms/DataForm";
import KnowledgeForm from "./forms/KnowledgeForm";
import OtherForm from "./forms/OtherForm";
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
      
      // Generic replacements that work across all forms
      if (formData.topic) {
        updatedPrompt = updatedPrompt.replace(/\[topic\]/g, formData.topic);
      }
      if (formData.keyPoints) {
        updatedPrompt = updatedPrompt.replace(/\[key points\]/g, formData.keyPoints);
      }
      if (formData.context) {
        updatedPrompt = updatedPrompt.replace(/\[context\]/g, formData.context);
      }
      if (formData.constraints) {
        updatedPrompt = updatedPrompt.replace(/\[constraints\]/g, formData.constraints);
      }
      if (formData.targetAudience) {
        updatedPrompt = updatedPrompt.replace(/\[target audience.*?\]/g, formData.targetAudience);
        updatedPrompt = updatedPrompt.replace(/\[audience.*?\]/g, formData.targetAudience);
        updatedPrompt = updatedPrompt.replace(/\[specific audience.*?\]/g, formData.targetAudience);
      }

      // Task-specific replacements
      switch (taskType) {
        case "content":
          break;
        case "code":
          if (formData.language) {
            updatedPrompt = updatedPrompt.replace(/\[language\]/g, formData.language);
          }
          if (formData.functionality) {
            updatedPrompt = updatedPrompt.replace(/\[functionality\]/g, formData.functionality);
          }
          break;
        case "idea":
          if (formData.challenge) {
            updatedPrompt = updatedPrompt.replace(/\[challenge\]/g, formData.challenge);
          }
          break;
        case "image":
          if (formData.subject) {
            updatedPrompt = updatedPrompt.replace(/\[subject\]/g, formData.subject);
          }
          if (formData.style) {
            updatedPrompt = updatedPrompt.replace(/\[style\]/g, formData.style);
          }
          if (formData.details) {
            updatedPrompt = updatedPrompt.replace(/\[details\]/g, formData.details);
          }
          if (formData.perspective) {
            updatedPrompt = updatedPrompt.replace(/\[perspective\]/g, formData.perspective);
          }
          if (formData.artReferences) {
            updatedPrompt = updatedPrompt.replace(/\[art references\]/g, formData.artReferences);
          }
          break;
        case "email":
          if (formData.purpose) {
            updatedPrompt = updatedPrompt.replace(/\[purpose.*?\]/g, formData.purpose);
          }
          if (formData.objective) {
            updatedPrompt = updatedPrompt.replace(/\[objective\]/g, formData.objective);
          }
          if (formData.company) {
            updatedPrompt = updatedPrompt.replace(/\[company.*?\]/g, formData.company);
          }
          if (formData.issue) {
            updatedPrompt = updatedPrompt.replace(/\[issue.*?\]/g, formData.issue);
          }
          if (formData.specificDetails) {
            updatedPrompt = updatedPrompt.replace(/\[specific details\]/g, formData.specificDetails);
          }
          if (formData.relatedIssues) {
            updatedPrompt = updatedPrompt.replace(/\[related issues\]/g, formData.relatedIssues);
          }
          if (formData.product) {
            updatedPrompt = updatedPrompt.replace(/\[product\/service\]/g, formData.product);
          }
          if (formData.benefits) {
            updatedPrompt = updatedPrompt.replace(/\[benefits\]/g, formData.benefits);
          }
          if (formData.keyBenefits) {
            updatedPrompt = updatedPrompt.replace(/\[2-3 key benefits\]/g, formData.keyBenefits);
          }
          break;
        case "research":
          if (formData.market) {
            updatedPrompt = updatedPrompt.replace(/\[market\/industry\]/g, formData.market);
          }
          if (formData.specificAspects) {
            updatedPrompt = updatedPrompt.replace(/\[specific aspects\]/g, formData.specificAspects);
          }
          if (formData.timePeriod) {
            updatedPrompt = updatedPrompt.replace(/\[time period\]/g, formData.timePeriod);
          }
          if (formData.competitors) {
            updatedPrompt = updatedPrompt.replace(/\[competitor names\]/g, formData.competitors);
          }
          if (formData.analysisAspects) {
            updatedPrompt = updatedPrompt.replace(/\[specific aspects\]/g, formData.analysisAspects);
          }
          if (formData.option1) {
            updatedPrompt = updatedPrompt.replace(/\[option 1\]/g, formData.option1);
          }
          if (formData.option2) {
            updatedPrompt = updatedPrompt.replace(/\[option 2\]/g, formData.option2);
          }
          if (formData.criteria) {
            updatedPrompt = updatedPrompt.replace(/\[criteria\]/g, formData.criteria);
          }
          break;
        case "seo":
          if (formData.keyword) {
            updatedPrompt = updatedPrompt.replace(/\[keyword\]/g, formData.keyword);
            updatedPrompt = updatedPrompt.replace(/\[keyword\/topic\]/g, formData.keyword);
          }
          if (formData.businessType) {
            updatedPrompt = updatedPrompt.replace(/\[business type\]/g, formData.businessType);
            updatedPrompt = updatedPrompt.replace(/\[business\]/g, formData.businessType);
          }
          if (formData.location) {
            updatedPrompt = updatedPrompt.replace(/\[location\]/g, formData.location);
          }
          if (formData.industry) {
            updatedPrompt = updatedPrompt.replace(/\[industry\]/g, formData.industry);
          }
          break;
        case "data":
          if (formData.dataset) {
            updatedPrompt = updatedPrompt.replace(/\[topic\/dataset\]/g, formData.dataset);
            updatedPrompt = updatedPrompt.replace(/\[dataset\]/g, formData.dataset);
          }
          if (formData.audience) {
            updatedPrompt = updatedPrompt.replace(/\[audience\/purpose\]/g, formData.audience);
          }
          if (formData.timeframe) {
            updatedPrompt = updatedPrompt.replace(/\[timeframe\]/g, formData.timeframe);
          }
          break;
      }
      
      // Only update if something changed
      if (updatedPrompt !== formData.prompt) {
        onChange("prompt", updatedPrompt);
      }
    }
  }, [taskType, subCategory, formData.promptTemplate, formData.topic, formData.keyPoints, 
      formData.language, formData.functionality, formData.challenge, formData.context, 
      formData.constraints, formData.subject, formData.style, formData.details,
      formData.perspective, formData.artReferences, formData.targetAudience,
      // Email fields
      formData.purpose, formData.objective, formData.company, formData.issue,
      formData.specificDetails, formData.relatedIssues, formData.product, formData.benefits,
      formData.keyBenefits,
      // Research fields  
      formData.market, formData.specificAspects, formData.timePeriod, formData.competitors,
      formData.analysisAspects, formData.option1, formData.option2, formData.criteria,
      // SEO fields
      formData.keyword, formData.businessType, formData.location, formData.industry,
      // Data fields
      formData.dataset, formData.audience, formData.timeframe,
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
      case "email":
        return <EmailForm formData={formData} onChange={onChange} subCategory={subCategory} />;
      case "research":
        return <ResearchForm formData={formData} onChange={onChange} subCategory={subCategory} />;
      case "seo":
        return <SEOForm formData={formData} onChange={onChange} subCategory={subCategory} />;
      case "data":
        return <DataForm formData={formData} onChange={onChange} subCategory={subCategory} />;
      case "knowledge":
        return <KnowledgeForm formData={formData} onChange={onChange} subCategory={subCategory} />;
      case "other":
        return <OtherForm formData={formData} onChange={onChange} subCategory={subCategory} />;
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
