import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OtherFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
  subCategory: string;
}

const OtherForm: React.FC<OtherFormProps> = ({ formData, onChange, subCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <>
      <div className="mb-4">
        <Label htmlFor="taskDescription">Task Description</Label>
        <Textarea
          name="taskDescription"
          placeholder="Describe the custom task you want AI to help with"
          value={formData.taskDescription || ""}
          onChange={handleChange}
          className="min-h-[100px]"
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="expectedOutput">Expected Output</Label>
        <Textarea
          name="expectedOutput"
          placeholder="What kind of output or result are you expecting?"
          value={formData.expectedOutput || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="context">Context/Background</Label>
        <Textarea
          name="context"
          placeholder="Provide any relevant context or background information"
          value={formData.context || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="constraints">Constraints/Requirements</Label>
        <Textarea
          name="constraints"
          placeholder="Any specific constraints, requirements, or limitations"
          value={formData.constraints || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="outputFormat">Preferred Output Format</Label>
        <Select
          value={formData.outputFormat || ""}
          onValueChange={(value) => onChange("outputFormat", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select output format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Plain Text</SelectItem>
            <SelectItem value="list">Bulleted List</SelectItem>
            <SelectItem value="structured">Structured Format</SelectItem>
            <SelectItem value="steps">Step-by-step</SelectItem>
            <SelectItem value="table">Table Format</SelectItem>
            <SelectItem value="creative">Creative/Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default OtherForm;