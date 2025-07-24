import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SEOFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
  subCategory: string;
}

const SEOForm: React.FC<SEOFormProps> = ({ formData, onChange, subCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  const renderSubCategoryFields = () => {
    switch (subCategory) {
      case "keyword":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="keyword">Target Keyword</Label>
              <Input
                name="keyword"
                placeholder="Primary keyword to optimize for"
                value={formData.keyword || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="topic">Content Topic</Label>
              <Input
                name="topic"
                placeholder="What is the content about?"
                value={formData.topic || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="secondaryKeywords">Secondary Keywords</Label>
              <Textarea
                name="secondaryKeywords"
                placeholder="Additional keywords to include (comma separated)"
                value={formData.secondaryKeywords || ""}
                onChange={handleChange}
                className="min-h-[60px]"
              />
            </div>
          </>
        );

      case "title":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="topic">Page Topic</Label>
              <Input
                name="topic"
                placeholder="What is the page/content about?"
                value={formData.topic || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="targetKeywords">Target Keywords</Label>
              <Textarea
                name="targetKeywords"
                placeholder="Keywords to include in title and meta description"
                value={formData.targetKeywords || ""}
                onChange={handleChange}
                className="min-h-[60px]"
              />
            </div>
          </>
        );

      case "local":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="businessType">Business Type</Label>
              <Input
                name="businessType"
                placeholder="Type of business (e.g., restaurant, dental clinic)"
                value={formData.businessType || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="location">Location</Label>
              <Input
                name="location"
                placeholder="City, state/region"
                value={formData.location || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="services">Services/Products</Label>
              <Textarea
                name="services"
                placeholder="Main services or products offered"
                value={formData.services || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );

      case "competitor":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="keyword">Keyword/Topic</Label>
              <Input
                name="keyword"
                placeholder="Keyword or topic to analyze competition for"
                value={formData.keyword || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="industry">Industry</Label>
              <Input
                name="industry"
                placeholder="Industry sector"
                value={formData.industry || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="seoTopic">SEO Topic</Label>
              <Input
                name="seoTopic"
                placeholder="What do you want to optimize for?"
                value={formData.seoTopic || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="targetKeywords">Target Keywords</Label>
              <Textarea
                name="targetKeywords"
                placeholder="List your target keywords"
                value={formData.targetKeywords || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );
    }
  };

  return (
    <>
      {renderSubCategoryFields()}
      <div className="mb-4">
        <Label htmlFor="targetAudience">Target Audience</Label>
        <Input
          name="targetAudience"
          placeholder="Who is your target audience?"
          value={formData.targetAudience || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="contentGoal">Content Goal</Label>
        <Select
          value={formData.contentGoal || ""}
          onValueChange={(value) => onChange("contentGoal", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select content goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="awareness">Brand Awareness</SelectItem>
            <SelectItem value="traffic">Increase Traffic</SelectItem>
            <SelectItem value="conversion">Drive Conversions</SelectItem>
            <SelectItem value="authority">Build Authority</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default SEOForm;