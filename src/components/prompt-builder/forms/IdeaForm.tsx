
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface IdeaFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ formData, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
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
};

export default IdeaForm;
