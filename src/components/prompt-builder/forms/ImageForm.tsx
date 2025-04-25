
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ImageFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

const ImageForm: React.FC<ImageFormProps> = ({ formData, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
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
};

export default ImageForm;
