
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface ImageFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

const ImageForm: React.FC<ImageFormProps> = ({ formData, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  const handleSelectChange = (field: string, value: string) => {
    onChange(field, value);
  };

  const imageStyles = [
    "Photorealistic", "Digital Art", "Oil Painting", "Watercolor", 
    "Pencil Sketch", "3D Render", "Pixel Art", "Cartoon", "Anime", 
    "Minimalist", "Abstract", "Surrealist", "Vintage", "Futuristic"
  ];

  return (
    <>
      <div className="mb-4">
        <Label htmlFor="subject">Subject/Content</Label>
        <Textarea
          id="subject"
          name="subject"
          placeholder="What should be in the image?"
          value={formData.subject || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="style">Image Style</Label>
        <Select 
          value={formData.style || ""} 
          onValueChange={(value) => handleSelectChange("style", value)}
        >
          <SelectTrigger id="style" className="w-full">
            <SelectValue placeholder="Select an image style" />
          </SelectTrigger>
          <SelectContent>
            {imageStyles.map((style) => (
              <SelectItem key={style} value={style.toLowerCase()}>
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="details">Visual Details</Label>
        <Textarea
          id="details"
          name="details"
          placeholder="Describe colors, composition, lighting, mood, etc."
          value={formData.details || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="perspective">Perspective/Angle (Optional)</Label>
        <Input
          id="perspective"
          name="perspective"
          placeholder="e.g., Bird's eye view, Close-up, Wide shot"
          value={formData.perspective || ""}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="dimensions">Aspect Ratio</Label>
        <Select 
          value={formData.dimensions || ""} 
          onValueChange={(value) => handleSelectChange("dimensions", value)}
        >
          <SelectTrigger id="dimensions" className="w-full">
            <SelectValue placeholder="Select aspect ratio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1:1">Square (1:1)</SelectItem>
            <SelectItem value="4:3">Standard (4:3)</SelectItem>
            <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
            <SelectItem value="9:16">Portrait (9:16)</SelectItem>
            <SelectItem value="3:2">Photo (3:2)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Label htmlFor="artReferences">Art References (Optional)</Label>
        <Textarea
          id="artReferences"
          name="artReferences"
          placeholder="Mention any specific artists, works, or styles to reference"
          value={formData.artReferences || ""}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default ImageForm;
