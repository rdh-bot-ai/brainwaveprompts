import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
  subCategory: string;
}

const DataForm: React.FC<DataFormProps> = ({ formData, onChange, subCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  const renderSubCategoryFields = () => {
    switch (subCategory) {
      case "interpret":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="dataset">Topic/Dataset</Label>
              <Input
                name="dataset"
                placeholder="What data are you analyzing?"
                value={formData.dataset || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="audience">Audience/Purpose</Label>
              <Input
                name="audience"
                placeholder="Who will use these insights?"
                value={formData.audience || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );

      case "visualize":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="dataset">Dataset Description</Label>
              <Textarea
                name="dataset"
                placeholder="Describe your data structure and content"
                value={formData.dataset || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="dataStory">Data Story</Label>
              <Textarea
                name="dataStory"
                placeholder="What story do you want to tell with this data?"
                value={formData.dataStory || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );

      case "metrics":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="objective">Objective/Goal</Label>
              <Textarea
                name="objective"
                placeholder="What objective or goal do you want to track?"
                value={formData.objective || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );

      case "forecast":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="topic">Data Topic</Label>
              <Input
                name="topic"
                placeholder="What data are you forecasting?"
                value={formData.topic || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="timeframe">Forecast Timeframe</Label>
              <Input
                name="timeframe"
                placeholder="How far into the future? (e.g., next 6 months, 2024)"
                value={formData.timeframe || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="dataType">Data Type</Label>
              <Input
                name="dataType"
                placeholder="What kind of data are you working with?"
                value={formData.dataType || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="analysisGoal">Analysis Goal</Label>
              <Textarea
                name="analysisGoal"
                placeholder="What do you want to achieve with this analysis?"
                value={formData.analysisGoal || ""}
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
        <Label htmlFor="analysisDepth">Analysis Depth</Label>
        <Select
          value={formData.analysisDepth || ""}
          onValueChange={(value) => onChange("analysisDepth", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select analysis depth" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="summary">Summary Level</SelectItem>
            <SelectItem value="detailed">Detailed Analysis</SelectItem>
            <SelectItem value="comprehensive">Comprehensive Deep-dive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default DataForm;