
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContentFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

const ContentForm: React.FC<ContentFormProps> = ({ formData, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
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
};

export default ContentForm;
