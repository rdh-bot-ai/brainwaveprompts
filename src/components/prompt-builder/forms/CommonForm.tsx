
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CommonFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

const CommonForm: React.FC<CommonFormProps> = ({ formData, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
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
};

export default CommonForm;
