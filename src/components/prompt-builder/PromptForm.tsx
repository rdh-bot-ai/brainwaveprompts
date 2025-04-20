
import React from "react";
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

interface PromptFormProps {
  taskType: TaskType;
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

const PromptForm: React.FC<PromptFormProps> = ({ taskType, formData, onChange }) => {
  // Helper to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.name, e.target.value);
  };

  // Common fields that appear in most forms
  const renderCommonFields = () => (
    <>
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
        <Label htmlFor="contentType">Content Type</Label>
        <Select
          name="contentType"
          value={formData.contentType || ""}
          onValueChange={(value) => onChange("contentType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blog">Blog Post</SelectItem>
            <SelectItem value="article">Article</SelectItem>
            <SelectItem value="essay">Essay</SelectItem>
            <SelectItem value="social">Social Media Post</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="story">Story</SelectItem>
          </SelectContent>
        </Select>
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
        <Label htmlFor="ideaType">Idea Type</Label>
        <Select
          name="ideaType"
          value={formData.ideaType || ""}
          onValueChange={(value) => onChange("ideaType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type of ideas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="creative">Creative Solutions</SelectItem>
            <SelectItem value="business">Business Strategies</SelectItem>
            <SelectItem value="product">Product Ideas</SelectItem>
            <SelectItem value="marketing">Marketing Concepts</SelectItem>
            <SelectItem value="personal">Personal Projects</SelectItem>
          </SelectContent>
        </Select>
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

  // Render different form fields based on task type
  const renderTaskSpecificFields = () => {
    switch (taskType) {
      case "content":
        return renderContentFields();
      case "code":
        return renderCodeFields();
      case "idea":
        return renderIdeaFields();
      // Add more task-specific forms as needed
      default:
        return (
          <div className="mb-4">
            <Label htmlFor="prompt">Your Prompt</Label>
            <Textarea
              name="prompt"
              placeholder="Describe what you want the AI to do in detail..."
              value={formData.prompt || ""}
              onChange={handleChange}
              className="min-h-[150px]"
            />
          </div>
        );
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
