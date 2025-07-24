import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ResearchFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
  subCategory: string;
}

const ResearchForm: React.FC<ResearchFormProps> = ({ formData, onChange, subCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  const renderSubCategoryFields = () => {
    switch (subCategory) {
      case "market":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="market">Market/Industry</Label>
              <Input
                name="market"
                placeholder="Which market or industry to research?"
                value={formData.market || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="specificAspects">Specific Aspects</Label>
              <Textarea
                name="specificAspects"
                placeholder="What specific aspects to focus on? (size, trends, competitors, etc.)"
                value={formData.specificAspects || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );

      case "academic":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="topic">Research Topic</Label>
              <Input
                name="topic"
                placeholder="Academic research topic"
                value={formData.topic || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="timePeriod">Time Period</Label>
              <Input
                name="timePeriod"
                placeholder="Research timeframe (e.g., last 5 years, 2020-2023)"
                value={formData.timePeriod || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="researchFocus">Research Focus</Label>
              <Textarea
                name="researchFocus"
                placeholder="Specific areas or questions to focus on"
                value={formData.researchFocus || ""}
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
              <Label htmlFor="competitors">Competitor Names</Label>
              <Textarea
                name="competitors"
                placeholder="List the competitors to analyze"
                value={formData.competitors || ""}
                onChange={handleChange}
                className="min-h-[60px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="analysisAspects">Analysis Aspects</Label>
              <Textarea
                name="analysisAspects"
                placeholder="What aspects to analyze? (pricing, features, marketing, etc.)"
                value={formData.analysisAspects || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );

      case "compare":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="option1">Option 1</Label>
              <Input
                name="option1"
                placeholder="First option to compare"
                value={formData.option1 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="option2">Option 2</Label>
              <Input
                name="option2"
                placeholder="Second option to compare"
                value={formData.option2 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="criteria">Comparison Criteria</Label>
              <Textarea
                name="criteria"
                placeholder="What criteria to compare them on?"
                value={formData.criteria || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="researchTopic">Research Topic</Label>
              <Input
                name="researchTopic"
                placeholder="What do you want to research?"
                value={formData.researchTopic || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="researchScope">Research Scope</Label>
              <Textarea
                name="researchScope"
                placeholder="Define the scope and focus of your research"
                value={formData.researchScope || ""}
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
        <Label htmlFor="researchDepth">Research Depth</Label>
        <Select
          value={formData.researchDepth || ""}
          onValueChange={(value) => onChange("researchDepth", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select research depth" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">High-level overview</SelectItem>
            <SelectItem value="detailed">Detailed analysis</SelectItem>
            <SelectItem value="comprehensive">Comprehensive deep-dive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default ResearchForm;