
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Settings, BookText, Volume2 } from "lucide-react";

interface CommonFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

const CommonForm: React.FC<CommonFormProps> = ({ formData, onChange }) => {
  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "friendly", label: "Friendly" },
    { value: "authoritative", label: "Authoritative" },
    { value: "academic", label: "Academic" },
    { value: "enthusiastic", label: "Enthusiastic" },
    { value: "humorous", label: "Humorous" },
    { value: "technical", label: "Technical" },
    { value: "persuasive", label: "Persuasive" },
    { value: "conversational", label: "Conversational" }
  ];

  return (
    <div className="space-y-6 mt-6">
      <div className="pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <Settings className="h-4 w-4 mr-2 text-purple-600" />
          Advanced Settings
        </h3>
      </div>
      
      {/* Tone Selection */}
      <div className="space-y-2">
        <Label htmlFor="tone" className="text-sm flex items-center">
          <Volume2 className="h-4 w-4 mr-2 text-purple-600" />
          Tone of Voice
        </Label>
        <Select
          value={formData.tone || "professional"}
          onValueChange={(value) => onChange("tone", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a tone" />
          </SelectTrigger>
          <SelectContent position="popper" className="w-full">
            {toneOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Detail Level Slider */}
      <div className="space-y-3">
        <Label htmlFor="detailLevel" className="text-sm flex items-center">
          <BookText className="h-4 w-4 mr-2 text-purple-600" />
          Detail Level
        </Label>
        <div className="px-1">
          <Slider
            id="detailLevel"
            defaultValue={[formData.detailLevel || 2]}
            max={3}
            min={1}
            step={1}
            onValueChange={(values) => onChange("detailLevel", values[0])}
            className="my-5"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Concise</span>
            <span>Balanced</span>
            <span>Detailed</span>
          </div>
        </div>
      </div>
      
      {/* Include Examples Switch */}
      <div className="flex items-center justify-between">
        <Label htmlFor="includeExamples" className="text-sm cursor-pointer flex-1">
          Include examples in the response
        </Label>
        <Switch
          id="includeExamples"
          checked={formData.includeExamples || false}
          onCheckedChange={(checked) => onChange("includeExamples", checked)}
        />
      </div>
      
      {/* Additional Context */}
      <div className="space-y-2">
        <Label htmlFor="additionalContext" className="text-sm">
          Additional Context (Optional)
        </Label>
        <Textarea
          id="additionalContext"
          placeholder="Add any additional context or information that might help generate a better prompt..."
          value={formData.additionalContext || ""}
          onChange={(e) => onChange("additionalContext", e.target.value)}
          className="min-h-[80px]"
        />
      </div>
    </div>
  );
};

export default CommonForm;
