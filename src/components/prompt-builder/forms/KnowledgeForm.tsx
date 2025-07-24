import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface KnowledgeFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
  subCategory: string;
}

const KnowledgeForm: React.FC<KnowledgeFormProps> = ({ formData, onChange, subCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <>
      <div className="mb-4">
        <Label htmlFor="topic">Topic/Subject</Label>
        <Input
          name="topic"
          placeholder="What topic do you need documentation for?"
          value={formData.topic || ""}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="audience">Target Audience</Label>
        <Select
          value={formData.audience || ""}
          onValueChange={(value) => onChange("audience", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select target audience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginners">Beginners</SelectItem>
            <SelectItem value="intermediate">Intermediate Users</SelectItem>
            <SelectItem value="advanced">Advanced Users</SelectItem>
            <SelectItem value="mixed">Mixed Audience</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Label htmlFor="contentType">Content Type</Label>
        <Select
          value={formData.contentType || ""}
          onValueChange={(value) => onChange("contentType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="documentation">Documentation</SelectItem>
            <SelectItem value="faq">FAQ</SelectItem>
            <SelectItem value="guide">Guide/Tutorial</SelectItem>
            <SelectItem value="reference">Reference Material</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="keyPoints">Key Points to Cover</Label>
        <Textarea
          name="keyPoints"
          placeholder="List the main points or sections to include"
          value={formData.keyPoints || ""}
          onChange={handleChange}
          className="min-h-[100px]"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="prerequisites">Prerequisites/Requirements</Label>
        <Textarea
          name="prerequisites"
          placeholder="What should users know or have before using this content?"
          value={formData.prerequisites || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>
    </>
  );
};

export default KnowledgeForm;