
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
import { ScrollArea } from "@/components/ui/scroll-area";

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
        // Development logging only
        if (process.env.NODE_ENV === 'development') {
          console.log("Setting template from subcategory:", basicTemplate);
        }
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
          // Content-specific replacements
          if (formData.tone) {
            updatedPrompt = updatedPrompt.replace(/\[tone\]/g, formData.tone);
          }
          if (formData.wordCount) {
            updatedPrompt = updatedPrompt.replace(/\[word count\]/g, formData.wordCount);
            updatedPrompt = updatedPrompt.replace(/\[duration.*?\]/g, formData.wordCount);
          }
          if (formData.researchDepth) {
            updatedPrompt = updatedPrompt.replace(/\[research depth\]/g, formData.researchDepth);
          }
          if (formData.sources) {
            updatedPrompt = updatedPrompt.replace(/\[sources\]/g, formData.sources);
          }
          if (formData.platforms) {
            updatedPrompt = updatedPrompt.replace(/\[platforms\]/g, formData.platforms);
          }
          if (formData.engagement) {
            updatedPrompt = updatedPrompt.replace(/\[engagement goal\]/g, formData.engagement);
          }
          if (formData.emailType) {
            updatedPrompt = updatedPrompt.replace(/\[email type\]/g, formData.emailType);
          }
          if (formData.cta) {
            updatedPrompt = updatedPrompt.replace(/\[call-to-action\]/g, formData.cta);
            updatedPrompt = updatedPrompt.replace(/\[cta\]/g, formData.cta);
          }
          if (formData.audienceLevel) {
            updatedPrompt = updatedPrompt.replace(/\[audience level.*?\]/g, formData.audienceLevel);
          }
          if (formData.prerequisites) {
            updatedPrompt = updatedPrompt.replace(/\[prerequisites\]/g, formData.prerequisites);
          }
          if (formData.duration) {
            updatedPrompt = updatedPrompt.replace(/\[duration.*?\]/g, formData.duration);
          }
          if (formData.platform) {
            updatedPrompt = updatedPrompt.replace(/\[platform\]/g, formData.platform);
          }
          if (formData.frequency) {
            updatedPrompt = updatedPrompt.replace(/\[frequency\]/g, formData.frequency);
          }
          if (formData.sections) {
            updatedPrompt = updatedPrompt.replace(/\[sections\]/g, formData.sections);
          }
          break;
        case "code":
          if (formData.language) {
            updatedPrompt = updatedPrompt.replace(/\[language\]/g, formData.language);
          }
          if (formData.functionality) {
            updatedPrompt = updatedPrompt.replace(/\[functionality\]/g, formData.functionality);
          }
          // Code subcategory-specific fields
          if (formData.parameters) {
            updatedPrompt = updatedPrompt.replace(/\[parameters\]/g, formData.parameters);
          }
          if (formData.returnType) {
            updatedPrompt = updatedPrompt.replace(/\[return type\]/g, formData.returnType);
          }
          if (formData.errorHandling) {
            updatedPrompt = updatedPrompt.replace(/\[error handling\]/g, formData.errorHandling);
          }
          if (formData.framework) {
            updatedPrompt = updatedPrompt.replace(/\[framework\]/g, formData.framework);
          }
          if (formData.props) {
            updatedPrompt = updatedPrompt.replace(/\[props\]/g, formData.props);
          }
          if (formData.styling) {
            updatedPrompt = updatedPrompt.replace(/\[styling\]/g, formData.styling);
          }
          if (formData.complexity) {
            updatedPrompt = updatedPrompt.replace(/\[complexity\]/g, formData.complexity);
          }
          if (formData.apiService) {
            updatedPrompt = updatedPrompt.replace(/\[specific API\/service\]/g, formData.apiService);
            updatedPrompt = updatedPrompt.replace(/\[API\/service\]/g, formData.apiService);
          }
          if (formData.authMethod) {
            updatedPrompt = updatedPrompt.replace(/\[auth method\]/g, formData.authMethod);
          }
          if (formData.endpoints) {
            updatedPrompt = updatedPrompt.replace(/\[endpoints\]/g, formData.endpoints);
          }
          if (formData.testFramework) {
            updatedPrompt = updatedPrompt.replace(/\[test framework\]/g, formData.testFramework);
          }
          if (formData.testTypes) {
            updatedPrompt = updatedPrompt.replace(/\[test types\]/g, formData.testTypes);
          }
          if (formData.codeToTest) {
            updatedPrompt = updatedPrompt.replace(/\[code to test\]/g, formData.codeToTest);
          }
          if (formData.currentCode) {
            updatedPrompt = updatedPrompt.replace(/\[paste code\]/g, formData.currentCode);
          }
          if (formData.refactorGoals) {
            updatedPrompt = updatedPrompt.replace(/\[refactor goals\]/g, formData.refactorGoals);
          }
          if (formData.databaseType) {
            updatedPrompt = updatedPrompt.replace(/\[database type\]/g, formData.databaseType);
          }
          if (formData.operation) {
            updatedPrompt = updatedPrompt.replace(/\[operation\]/g, formData.operation);
          }
          if (formData.requirements) {
            updatedPrompt = updatedPrompt.replace(/\[requirements\]/g, formData.requirements);
          }
          break;
        case "idea":
          if (formData.challenge) {
            updatedPrompt = updatedPrompt.replace(/\[challenge\]/g, formData.challenge);
          }
          // Idea subcategory-specific fields
          if (formData.targetMarket) {
            updatedPrompt = updatedPrompt.replace(/\[target market\]/g, formData.targetMarket);
          }
          if (formData.businessModel) {
            updatedPrompt = updatedPrompt.replace(/\[business model\]/g, formData.businessModel);
          }
          if (formData.investmentLevel) {
            updatedPrompt = updatedPrompt.replace(/\[investment level\]/g, formData.investmentLevel);
          }
          if (formData.targetUsers) {
            updatedPrompt = updatedPrompt.replace(/\[target users\]/g, formData.targetUsers);
          }
          if (formData.productType) {
            updatedPrompt = updatedPrompt.replace(/\[product type\]/g, formData.productType);
          }
          if (formData.painPoints) {
            updatedPrompt = updatedPrompt.replace(/\[pain points\]/g, formData.painPoints);
          }
          if (formData.problemScope) {
            updatedPrompt = updatedPrompt.replace(/\[problem scope\]/g, formData.problemScope);
          }
          if (formData.stakeholders) {
            updatedPrompt = updatedPrompt.replace(/\[stakeholders\]/g, formData.stakeholders);
          }
          if (formData.timeline) {
            updatedPrompt = updatedPrompt.replace(/\[timeline\]/g, formData.timeline);
          }
          if (formData.medium) {
            updatedPrompt = updatedPrompt.replace(/\[medium\]/g, formData.medium);
          }
          if (formData.audience) {
            updatedPrompt = updatedPrompt.replace(/\[audience\]/g, formData.audience);
          }
          if (formData.emotion) {
            updatedPrompt = updatedPrompt.replace(/\[emotion\]/g, formData.emotion);
          }
          if (formData.product) {
            updatedPrompt = updatedPrompt.replace(/\[product\/service\]/g, formData.product);
          }
          if (formData.budget) {
            updatedPrompt = updatedPrompt.replace(/\[budget\]/g, formData.budget);
          }
          if (formData.channels) {
            updatedPrompt = updatedPrompt.replace(/\[channels\]/g, formData.channels);
          }
          if (formData.goals) {
            updatedPrompt = updatedPrompt.replace(/\[goals\]/g, formData.goals);
          }
          if (formData.innovationType) {
            updatedPrompt = updatedPrompt.replace(/\[innovation type\]/g, formData.innovationType);
          }
          if (formData.trends) {
            updatedPrompt = updatedPrompt.replace(/\[trends\]/g, formData.trends);
          }
          if (formData.capabilities) {
            updatedPrompt = updatedPrompt.replace(/\[capabilities\]/g, formData.capabilities);
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
          // Image subcategory-specific fields
          if (formData.artisticInfluence) {
            updatedPrompt = updatedPrompt.replace(/\[artistic influence\]/g, formData.artisticInfluence);
            updatedPrompt = updatedPrompt.replace(/\[art references\]/g, formData.artisticInfluence);
          }
          if (formData.colorPalette) {
            updatedPrompt = updatedPrompt.replace(/\[colors\]/g, formData.colorPalette);
            updatedPrompt = updatedPrompt.replace(/\[color palette\]/g, formData.colorPalette);
          }
          if (formData.lighting) {
            updatedPrompt = updatedPrompt.replace(/\[lighting\]/g, formData.lighting);
          }
          if (formData.composition) {
            updatedPrompt = updatedPrompt.replace(/\[composition\]/g, formData.composition);
          }
          if (formData.cameraSettings) {
            updatedPrompt = updatedPrompt.replace(/\[settings.*?\]/g, formData.cameraSettings);
            updatedPrompt = updatedPrompt.replace(/\[camera settings\]/g, formData.cameraSettings);
          }
          if (formData.lightingConditions) {
            updatedPrompt = updatedPrompt.replace(/\[lighting conditions\]/g, formData.lightingConditions);
          }
          if (formData.photographyStyle) {
            updatedPrompt = updatedPrompt.replace(/\[photography style\]/g, formData.photographyStyle);
          }
          if (formData.postProcessing) {
            updatedPrompt = updatedPrompt.replace(/\[post processing\]/g, formData.postProcessing);
          }
          if (formData.materials) {
            updatedPrompt = updatedPrompt.replace(/\[materials\]/g, formData.materials);
          }
          if (formData.lightingSetup) {
            updatedPrompt = updatedPrompt.replace(/\[lighting setup\]/g, formData.lightingSetup);
          }
          if (formData.renderingStyle) {
            updatedPrompt = updatedPrompt.replace(/\[rendering style\]/g, formData.renderingStyle);
          }
          if (formData.cameraSpecs) {
            updatedPrompt = updatedPrompt.replace(/\[camera specs\]/g, formData.cameraSpecs);
          }
          if (formData.purpose) {
            updatedPrompt = updatedPrompt.replace(/\[purpose.*?\]/g, formData.purpose);
          }
          if (formData.functionalAspects) {
            updatedPrompt = updatedPrompt.replace(/\[functional aspects\]/g, formData.functionalAspects);
          }
          if (formData.worldContext) {
            updatedPrompt = updatedPrompt.replace(/\[world context\]/g, formData.worldContext);
          }
          if (formData.designLanguage) {
            updatedPrompt = updatedPrompt.replace(/\[design language\]/g, formData.designLanguage);
          }
          if (formData.keyFeatures) {
            updatedPrompt = updatedPrompt.replace(/\[key features\]/g, formData.keyFeatures);
          }
          if (formData.studioSetup) {
            updatedPrompt = updatedPrompt.replace(/\[studio setup\]/g, formData.studioSetup);
          }
          if (formData.productAngle) {
            updatedPrompt = updatedPrompt.replace(/\[product angle\]/g, formData.productAngle);
          }
          if (formData.retouchingLevel) {
            updatedPrompt = updatedPrompt.replace(/\[retouching level\]/g, formData.retouchingLevel);
          }
          if (formData.characterType) {
            updatedPrompt = updatedPrompt.replace(/\[character type\]/g, formData.characterType);
          }
          if (formData.personality) {
            updatedPrompt = updatedPrompt.replace(/\[personality\]/g, formData.personality);
          }
          if (formData.physicalAttributes) {
            updatedPrompt = updatedPrompt.replace(/\[physical attributes\]/g, formData.physicalAttributes);
          }
          if (formData.costume) {
            updatedPrompt = updatedPrompt.replace(/\[costume\]/g, formData.costume);
          }
          if (formData.poses) {
            updatedPrompt = updatedPrompt.replace(/\[poses\]/g, formData.poses);
          }
          if (formData.environmentType) {
            updatedPrompt = updatedPrompt.replace(/\[environment type\]/g, formData.environmentType);
          }
          if (formData.atmosphere) {
            updatedPrompt = updatedPrompt.replace(/\[atmosphere\]/g, formData.atmosphere);
          }
          if (formData.architecturalElements) {
            updatedPrompt = updatedPrompt.replace(/\[architectural elements\]/g, formData.architecturalElements);
          }
          if (formData.timeOfDay) {
            updatedPrompt = updatedPrompt.replace(/\[time of day\]/g, formData.timeOfDay);
          }
          if (formData.storytelling) {
            updatedPrompt = updatedPrompt.replace(/\[storytelling\]/g, formData.storytelling);
          }
          if (formData.perspective) {
            updatedPrompt = updatedPrompt.replace(/\[perspective\]/g, formData.perspective);
          }
          if (formData.aspectRatio) {
            updatedPrompt = updatedPrompt.replace(/\[aspect ratio\]/g, formData.aspectRatio);
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
            updatedPrompt = updatedPrompt.replace(/\[analysis aspects\]/g, formData.analysisAspects);
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
          // Additional research fields
          if (formData.researchFocus) {
            updatedPrompt = updatedPrompt.replace(/\[research focus\]/g, formData.researchFocus);
          }
          if (formData.researchTopic) {
            updatedPrompt = updatedPrompt.replace(/\[research topic\]/g, formData.researchTopic);
          }
          if (formData.researchScope) {
            updatedPrompt = updatedPrompt.replace(/\[research scope\]/g, formData.researchScope);
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
          // Additional SEO fields
          if (formData.secondaryKeywords) {
            updatedPrompt = updatedPrompt.replace(/\[secondary keywords\]/g, formData.secondaryKeywords);
          }
          if (formData.targetKeywords) {
            updatedPrompt = updatedPrompt.replace(/\[target keywords\]/g, formData.targetKeywords);
          }
          if (formData.services) {
            updatedPrompt = updatedPrompt.replace(/\[services\]/g, formData.services);
          }
          if (formData.seoTopic) {
            updatedPrompt = updatedPrompt.replace(/\[seo topic\]/g, formData.seoTopic);
          }
          if (formData.contentGoal) {
            updatedPrompt = updatedPrompt.replace(/\[content goal\]/g, formData.contentGoal);
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
        case "knowledge":
          // Knowledge-specific replacements
          if (formData.contentType) {
            updatedPrompt = updatedPrompt.replace(/\[content type\]/g, formData.contentType);
          }
          break;
        case "other":
          // Other-specific replacements
          if (formData.taskDescription) {
            updatedPrompt = updatedPrompt.replace(/\[task description\]/g, formData.taskDescription);
          }
          if (formData.expectedOutput) {
            updatedPrompt = updatedPrompt.replace(/\[expected output\]/g, formData.expectedOutput);
          }
          if (formData.outputFormat) {
            updatedPrompt = updatedPrompt.replace(/\[output format\]/g, formData.outputFormat);
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
      formData.targetAudience,
      // Content-specific fields
      formData.tone, formData.wordCount, formData.researchDepth, formData.sources,
      formData.platforms, formData.engagement, formData.emailType, formData.cta,
      formData.audienceLevel, formData.prerequisites, formData.duration, formData.platform,
      formData.frequency, formData.sections,
      // Email fields
      formData.purpose, formData.objective, formData.company, formData.issue,
      formData.specificDetails, formData.relatedIssues, formData.product, formData.benefits,
      formData.keyBenefits,
      // Research fields  
      formData.market, formData.specificAspects, formData.timePeriod, formData.competitors,
      formData.analysisAspects, formData.option1, formData.option2, formData.criteria,
      formData.researchFocus, formData.researchTopic, formData.researchScope,
      // SEO fields
      formData.keyword, formData.businessType, formData.location, formData.industry,
      formData.secondaryKeywords, formData.targetKeywords, formData.services, formData.seoTopic,
      formData.contentGoal,
      // Data fields
      formData.dataset, formData.audience, formData.timeframe,
      // Code fields
      formData.parameters, formData.returnType, formData.errorHandling, formData.framework,
      formData.props, formData.styling, formData.complexity, formData.apiService, formData.authMethod,
      formData.endpoints, formData.testFramework, formData.testTypes, formData.codeToTest,
      formData.currentCode, formData.refactorGoals, formData.databaseType, formData.operation,
      formData.requirements,
      // Idea fields
      formData.targetMarket, formData.businessModel, formData.investmentLevel, formData.targetUsers,
      formData.productType, formData.painPoints, formData.problemScope, formData.stakeholders,
      formData.timeline, formData.medium, formData.audience, formData.emotion, formData.budget,
      formData.channels, formData.goals, formData.innovationType, formData.trends, formData.capabilities,
      // Image fields
      formData.artisticInfluence, formData.colorPalette, formData.lighting, formData.composition,
      formData.cameraSettings, formData.lightingConditions, formData.photographyStyle, formData.postProcessing,
      formData.materials, formData.lightingSetup, formData.renderingStyle, formData.cameraSpecs,
      formData.functionalAspects, formData.worldContext, formData.designLanguage, formData.keyFeatures,
      formData.studioSetup, formData.productAngle, formData.retouchingLevel, formData.characterType,
      formData.personality, formData.physicalAttributes, formData.costume, formData.poses,
      formData.environmentType, formData.atmosphere, formData.architecturalElements, formData.timeOfDay,
      formData.storytelling, formData.perspective, formData.aspectRatio,
      // Knowledge fields
      formData.contentType,
      // Other fields
      formData.taskDescription, formData.expectedOutput, formData.outputFormat,
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
        return <ContentForm formData={formData} onChange={onChange} subCategory={subCategory} />;
      case "code":
        return <CodeForm formData={formData} onChange={onChange} subCategory={subCategory} />;
      case "idea":
        return <IdeaForm formData={formData} onChange={onChange} subCategory={subCategory} />;
      case "image":
        return <ImageForm formData={formData} onChange={onChange} subCategory={subCategory} />;
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
        <ScrollArea className="h-[200px] w-full bg-gray-50 border border-gray-200 rounded-lg">
          <textarea
            value={formData.prompt || ""}
            onChange={handleEditorChange}
            className="min-h-[150px] w-full bg-transparent p-4 text-sm focus:outline-none resize-none"
            placeholder="Your template will appear here as you complete the form..."
            disabled={true}
          />
        </ScrollArea>
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
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 pb-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm">Customize your prompt</h3>
            <p className="text-xs text-gray-500 mt-1">Fill in the details below to personalize your prompt</p>
          </div>
          <ScrollArea className="h-[400px] w-full">
            <div className="p-4">
              {renderTaskSpecificForm()}
              <CommonForm formData={formData} onChange={onChange} />
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default PromptForm;
