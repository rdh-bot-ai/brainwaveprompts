
import React, { useEffect } from "react";
import { TaskType } from "./TaskIcons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUBCATEGORIES } from "./subcategories";

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
  // Helper to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.name, e.target.value);
  };

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
      
      // Only update if something changed
      if (updatedPrompt !== formData.prompt) {
        onChange("prompt", updatedPrompt);
      }
    }
  }, [taskType, subCategory, formData.topic, formData.keyPoints, formData.language, formData.functionality]);

  // Common fields that appear in most forms
  const renderCommonFields = () => (
    <>
      <div className="mb-6">
        <Label htmlFor="prompt" className="text-lg font-medium">Your Prompt Template</Label>
        <p className="text-sm text-gray-500 mb-2">
          This template will be used to generate your enhanced prompt. Edit it to customize.
        </p>
        <Textarea
          name="prompt"
          value={formData.prompt || ""}
          onChange={handleChange}
          className="min-h-[150px] font-mono text-sm"
          placeholder="Your prompt template appears here. Edit it to customize..."
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="tone">Tone</Label>
        <Select
          name="tone"
          value={formData.tone || ""}
          onValueChange={(value) => onChange("tone", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
            <SelectItem value="formal">Formal</SelectItem>
            <SelectItem value="friendly">Friendly</SelectItem>
            <SelectItem value="authoritative">Authoritative</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
        <Textarea
          name="additionalContext"
          placeholder="Add any additional context that might help..."
          value={formData.additionalContext || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>

      <div className="mb-4 flex flex-row items-center justify-between">
        <Label htmlFor="includeExamples">Include Examples</Label>
        <Switch
          id="includeExamples"
          checked={formData.includeExamples || false}
          onCheckedChange={(checked) => onChange("includeExamples", checked)}
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between">
          <Label htmlFor="detailLevel">Detail Level</Label>
          <span className="text-xs text-gray-500">
            {formData.detailLevel === 1 ? 'Basic' : 
             formData.detailLevel === 2 ? 'Moderate' : 'Detailed'}
          </span>
        </div>
        <Slider
          id="detailLevel"
          min={1}
          max={3}
          step={1}
          value={[formData.detailLevel || 2]}
          onValueChange={(value) => onChange("detailLevel", value[0])}
          className="my-2"
        />
      </div>
    </>
  );

  const renderContentFields = () => (
    <>
      <div className="mb-4">
        <Label htmlFor="topic">Topic/Title</Label>
        <Input
          name="topic"
          placeholder="What's your content about?"
          value={formData.topic || ""}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="keyPoints">Key Points</Label>
        <Textarea
          name="keyPoints"
          placeholder="Main points to include..."
          value={formData.keyPoints || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="targetAudience">Target Audience</Label>
        <Input
          name="targetAudience"
          placeholder="Who is this content for?"
          value={formData.targetAudience || ""}
          onChange={handleChange}
        />
      </div>
    </>
  );

  const renderCodeFields = () => (
    <>
      <div className="mb-4">
        <Label htmlFor="language">Programming Language</Label>
        <Select
          name="language"
          value={formData.language || ""}
          onValueChange={(value) => onChange("language", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="csharp">C#</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="php">PHP</SelectItem>
            <SelectItem value="ruby">Ruby</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="swift">Swift</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="functionality">Functionality Description</Label>
        <Textarea
          name="functionality"
          placeholder="Describe what your code should do..."
          value={formData.functionality || ""}
          onChange={handleChange}
          className="min-h-[120px]"
        />
      </div>
      
      <div className="mb-4 flex flex-row items-center justify-between">
        <Label htmlFor="includeComments">Include Comments</Label>
        <Switch
          id="includeComments"
          checked={formData.includeComments || true}
          onCheckedChange={(checked) => onChange("includeComments", checked)}
        />
      </div>
      
      <div className="mb-4 flex flex-row items-center justify-between">
        <Label htmlFor="optimizePerformance">Optimize for Performance</Label>
        <Switch
          id="optimizePerformance"
          checked={formData.optimizePerformance || false}
          onCheckedChange={(checked) => onChange("optimizePerformance", checked)}
        />
      </div>
    </>
  );

  const renderIdeaFields = () => (
    <>
      <div className="mb-4">
        <Label htmlFor="challenge">Challenge/Problem</Label>
        <Textarea
          name="challenge"
          placeholder="What problem are you trying to solve or what ideas do you need?"
          value={formData.challenge || ""}
          onChange={handleChange}
          className="min-h-[100px]"
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="context">Context/Background</Label>
        <Textarea
          name="context"
          placeholder="Any background information that's relevant..."
          value={formData.context || ""}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="constraints">Constraints (Optional)</Label>
        <Textarea
          name="constraints"
          placeholder="Any limitations or requirements to consider..."
          value={formData.constraints || ""}
          onChange={handleChange}
        />
      </div>
    </>
  );

  const renderImageFields = () => (
    <>
      <div className="mb-4">
        <Label htmlFor="subject">Subject</Label>
        <Input
          name="subject"
          placeholder="What should be in the image?"
          value={formData.subject || ""}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="style">Visual Style</Label>
        <Select
          name="style"
          value={formData.style || ""}
          onValueChange={(value) => onChange("style", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select visual style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="realistic">Photorealistic</SelectItem>
            <SelectItem value="abstract">Abstract</SelectItem>
            <SelectItem value="cartoon">Cartoon/Stylized</SelectItem>
            <SelectItem value="3d">3D Rendered</SelectItem>
            <SelectItem value="watercolor">Watercolor</SelectItem>
            <SelectItem value="oil">Oil Painting</SelectItem>
            <SelectItem value="digital">Digital Art</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="details">Visual Details</Label>
        <Textarea
          name="details"
          placeholder="Describe specific visual elements, colors, lighting, mood..."
          value={formData.details || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>
    </>
  );

  // Render different form fields based on task type
  const renderTaskSpecificFields = () => {
    switch (taskType) {
      case "content":
        return renderContentFields();
      case "code":
        return renderCodeFields();
      case "idea":
        return renderIdeaFields();
      case "image":
        return renderImageFields();
      // Add more task-specific forms as needed
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      {renderTaskSpecificFields()}
      {renderCommonFields()}
    </div>
  );
};

export default PromptForm;
