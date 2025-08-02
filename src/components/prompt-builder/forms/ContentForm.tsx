
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { validatePromptForm } from "@/utils/validation-schemas";
import { AlertCircle } from "lucide-react";

interface ContentFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
  subCategory: string;
}

const ContentForm: React.FC<ContentFormProps> = ({ formData, onChange, subCategory }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Validate form data when it changes
  useEffect(() => {
    const validation = validatePromptForm(formData);
    setErrors(validation.errors);
  }, [formData]);
  
  const renderFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      return (
        <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
          <AlertCircle className="w-4 h-4" />
          {errors[fieldName]}
        </div>
      );
    }
    return null;
  };

  // Common fields for all content types
  const renderCommonFields = () => (
    <>
      <div className="mb-4">
        <Label htmlFor="topic">Topic/Subject</Label>
        <Input
          name="topic"
          placeholder="What's your content about?"
          value={formData.topic || ""}
          onChange={handleChange}
          className={errors.topic ? "border-red-500" : ""}
        />
        {renderFieldError("topic")}
      </div>
      
      <div className="mb-4">
        <Label htmlFor="keyPoints">Key Points to Cover</Label>
        <Textarea
          name="keyPoints"
          placeholder="Main points, sections, or ideas to include..."
          value={formData.keyPoints || ""}
          onChange={handleChange}
          className={`min-h-[80px] ${errors.keyPoints ? "border-red-500" : ""}`}
        />
        {renderFieldError("keyPoints")}
      </div>
      
      <div className="mb-4">
        <Label htmlFor="targetAudience">Target Audience</Label>
        <Input
          name="targetAudience"
          placeholder="Specify audience demographics, knowledge level, interests..."
          value={formData.targetAudience || ""}
          onChange={handleChange}
          className={errors.targetAudience ? "border-red-500" : ""}
        />
        {renderFieldError("targetAudience")}
      </div>
    </>
  );

  // Subcategory-specific fields
  const renderSubcategoryFields = () => {
    switch (subCategory) {
      case "blog":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="tone">Content Tone</Label>
              <Select
                value={formData.tone || ""}
                onValueChange={(value) => onChange("tone", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversational">Conversational & Friendly</SelectItem>
                  <SelectItem value="authoritative">Authoritative & Expert</SelectItem>
                  <SelectItem value="inspiring">Inspiring & Motivational</SelectItem>
                  <SelectItem value="analytical">Analytical & Data-driven</SelectItem>
                  <SelectItem value="storytelling">Story-driven & Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="wordCount">Target Word Count</Label>
              <Select
                value={formData.wordCount || ""}
                onValueChange={(value) => onChange("wordCount", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select word count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="800-1200">Short (800-1200 words)</SelectItem>
                  <SelectItem value="1200-2000">Medium (1200-2000 words)</SelectItem>
                  <SelectItem value="2000-3000">Long (2000-3000 words)</SelectItem>
                  <SelectItem value="3000+">Comprehensive (3000+ words)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case "article":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="researchDepth">Research Depth Required</Label>
              <Select
                value={formData.researchDepth || ""}
                onValueChange={(value) => onChange("researchDepth", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select research level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic - General knowledge</SelectItem>
                  <SelectItem value="moderate">Moderate - Industry insights</SelectItem>
                  <SelectItem value="deep">Deep - Academic/Expert level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="sources">Preferred Source Types</Label>
              <Textarea
                name="sources"
                placeholder="Academic journals, industry reports, expert interviews, etc."
                value={formData.sources || ""}
                onChange={handleChange}
                className="min-h-[60px]"
              />
            </div>
          </>
        );
      
      case "social":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="platforms">Target Platforms</Label>
              <Textarea
                name="platforms"
                placeholder="LinkedIn, Twitter/X, Instagram, Facebook, TikTok, etc."
                value={formData.platforms || ""}
                onChange={handleChange}
                className="min-h-[60px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="engagement">Engagement Goal</Label>
              <Select
                value={formData.engagement || ""}
                onValueChange={(value) => onChange("engagement", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Primary engagement goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">Brand Awareness</SelectItem>
                  <SelectItem value="engagement">Comments & Shares</SelectItem>
                  <SelectItem value="leads">Lead Generation</SelectItem>
                  <SelectItem value="traffic">Website Traffic</SelectItem>
                  <SelectItem value="community">Community Building</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case "email":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="emailType">Email Type</Label>
              <Select
                value={formData.emailType || ""}
                onValueChange={(value) => onChange("emailType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select email type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="promotional">Promotional Campaign</SelectItem>
                  <SelectItem value="educational">Educational Content</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="nurture">Lead Nurture</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="cta">Primary Call-to-Action</Label>
              <Input
                name="cta"
                placeholder="What action should readers take?"
                value={formData.cta || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case "technical":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="audienceLevel">Technical Audience Level</Label>
              <Select
                value={formData.audienceLevel || ""}
                onValueChange={(value) => onChange("audienceLevel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select audience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner - New to topic</SelectItem>
                  <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                  <SelectItem value="advanced">Advanced - Expert level</SelectItem>
                  <SelectItem value="mixed">Mixed - Multiple skill levels</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="prerequisites">Prerequisites/Requirements</Label>
              <Textarea
                name="prerequisites"
                placeholder="Required knowledge, tools, systems, access..."
                value={formData.prerequisites || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );
      
      case "script":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="duration">Video Duration</Label>
              <Select
                value={formData.duration || ""}
                onValueChange={(value) => onChange("duration", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30-60 seconds">Short (30-60 seconds)</SelectItem>
                  <SelectItem value="2-3 minutes">Medium (2-3 minutes)</SelectItem>
                  <SelectItem value="5-7 minutes">Standard (5-7 minutes)</SelectItem>
                  <SelectItem value="8-10 minutes">Long (8-10 minutes)</SelectItem>
                  <SelectItem value="10+ minutes">Extended (10+ minutes)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="platform">Video Platform</Label>
              <Select
                value={formData.platform || ""}
                onValueChange={(value) => onChange("platform", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok/Instagram Reels</SelectItem>
                  <SelectItem value="linkedin">LinkedIn Video</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="training">Training/Educational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case "newsletter":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="frequency">Newsletter Frequency</Label>
              <Select
                value={formData.frequency || ""}
                onValueChange={(value) => onChange("frequency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="special">Special Edition</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="sections">Newsletter Sections</Label>
              <Textarea
                name="sections"
                placeholder="Main article, industry news, tips, spotlight, etc."
                value={formData.sections || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {renderCommonFields()}
      {renderSubcategoryFields()}
    </>
  );
};

export default ContentForm;
