
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IdeaFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
  subCategory: string;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ formData, onChange, subCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
  };

  // Common fields for all idea types
  const renderCommonFields = () => (
    <>
      <div className="mb-4">
        <Label htmlFor="challenge">Challenge/Problem/Opportunity</Label>
        <Textarea
          name="challenge"
          placeholder="Describe the problem you're solving or opportunity you're exploring..."
          value={formData.challenge || ""}
          onChange={handleChange}
          className="min-h-[100px]"
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="context">Context/Background</Label>
        <Textarea
          name="context"
          placeholder="Industry context, current situation, relevant background..."
          value={formData.context || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="constraints">Constraints & Requirements</Label>
        <Textarea
          name="constraints"
          placeholder="Budget, timeline, resources, technical limitations..."
          value={formData.constraints || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>
    </>
  );

  // Subcategory-specific fields
  const renderSubcategoryFields = () => {
    switch (subCategory) {
      case "business":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="targetMarket">Target Market/Industry</Label>
              <Input
                name="targetMarket"
                placeholder="Which market or industry are you targeting?"
                value={formData.targetMarket || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="businessModel">Preferred Business Model</Label>
              <Select
                value={formData.businessModel || ""}
                onValueChange={(value) => onChange("businessModel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business model preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subscription">Subscription/SaaS</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                  <SelectItem value="service">Service-based</SelectItem>
                  <SelectItem value="product">Product Sales</SelectItem>
                  <SelectItem value="advertising">Advertising Revenue</SelectItem>
                  <SelectItem value="open">Open to suggestions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="investmentLevel">Investment/Resource Level</Label>
              <Select
                value={formData.investmentLevel || ""}
                onValueChange={(value) => onChange("investmentLevel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Available resources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bootstrap">Bootstrap/Minimal Investment</SelectItem>
                  <SelectItem value="moderate">Moderate Investment</SelectItem>
                  <SelectItem value="substantial">Substantial Investment</SelectItem>
                  <SelectItem value="unlimited">Investment Not a Constraint</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case "product":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="targetUsers">Target User Group</Label>
              <Input
                name="targetUsers"
                placeholder="Who will use this product? Demographics, roles, etc."
                value={formData.targetUsers || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="productType">Product Category</Label>
              <Select
                value={formData.productType || ""}
                onValueChange={(value) => onChange("productType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digital">Digital Product/App</SelectItem>
                  <SelectItem value="physical">Physical Product</SelectItem>
                  <SelectItem value="service">Service Product</SelectItem>
                  <SelectItem value="platform">Platform/Tool</SelectItem>
                  <SelectItem value="content">Content Product</SelectItem>
                  <SelectItem value="hybrid">Hybrid (Physical + Digital)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="painPoints">Specific Pain Points</Label>
              <Textarea
                name="painPoints"
                placeholder="What specific problems or frustrations do users currently face?"
                value={formData.painPoints || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );
      
      case "solution":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="problemScope">Problem Scope</Label>
              <Select
                value={formData.problemScope || ""}
                onValueChange={(value) => onChange("problemScope", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select problem scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal/Individual</SelectItem>
                  <SelectItem value="team">Team/Department</SelectItem>
                  <SelectItem value="organization">Organizational</SelectItem>
                  <SelectItem value="industry">Industry-wide</SelectItem>
                  <SelectItem value="societal">Societal/Global</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="stakeholders">Key Stakeholders</Label>
              <Input
                name="stakeholders"
                placeholder="Who is affected by this problem? Who needs to buy-in?"
                value={formData.stakeholders || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="timeline">Implementation Timeline</Label>
              <Select
                value={formData.timeline || ""}
                onValueChange={(value) => onChange("timeline", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="When do you need this solved?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (days)</SelectItem>
                  <SelectItem value="short">Short-term (weeks)</SelectItem>
                  <SelectItem value="medium">Medium-term (months)</SelectItem>
                  <SelectItem value="long">Long-term (quarters/years)</SelectItem>
                  <SelectItem value="flexible">Timeline Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case "creative":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="medium">Creative Medium</Label>
              <Select
                value={formData.medium || ""}
                onValueChange={(value) => onChange("medium", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select creative medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual (Graphics, Art, Design)</SelectItem>
                  <SelectItem value="written">Written (Copy, Content, Stories)</SelectItem>
                  <SelectItem value="video">Video/Film</SelectItem>
                  <SelectItem value="audio">Audio/Music</SelectItem>
                  <SelectItem value="interactive">Interactive/Digital Experience</SelectItem>
                  <SelectItem value="physical">Physical/Experiential</SelectItem>
                  <SelectItem value="mixed">Mixed Media</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="audience">Creative Audience</Label>
              <Input
                name="audience"
                placeholder="Who is the target audience for this creative work?"
                value={formData.audience || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="emotion">Desired Emotional Response</Label>
              <Input
                name="emotion"
                placeholder="What feeling or reaction should this evoke?"
                value={formData.emotion || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case "marketing":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="product">Product/Service</Label>
              <Input
                name="product"
                placeholder="What are you marketing?"
                value={formData.product || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="audience">Target Audience</Label>
              <Textarea
                name="audience"
                placeholder="Demographics, psychographics, behaviors, pain points..."
                value={formData.audience || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="budget">Marketing Budget Range</Label>
              <Select
                value={formData.budget || ""}
                onValueChange={(value) => onChange("budget", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal Budget (Organic/Low-cost)</SelectItem>
                  <SelectItem value="small">Small Budget ($1K-$10K)</SelectItem>
                  <SelectItem value="medium">Medium Budget ($10K-$50K)</SelectItem>
                  <SelectItem value="large">Large Budget ($50K+)</SelectItem>
                  <SelectItem value="unlimited">Budget Not a Constraint</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="channels">Preferred Channels</Label>
              <Textarea
                name="channels"
                placeholder="Social media, email, content, paid ads, events, etc."
                value={formData.channels || ""}
                onChange={handleChange}
                className="min-h-[60px]"
              />
            </div>
          </>
        );
      
      case "content-strategy":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="platform">Primary Platform/Channel</Label>
              <Select
                value={formData.platform || ""}
                onValueChange={(value) => onChange("platform", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select primary platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog/Website</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="email">Email Newsletter</SelectItem>
                  <SelectItem value="video">Video (YouTube, etc.)</SelectItem>
                  <SelectItem value="podcast">Podcast</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="multichannel">Multi-channel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="frequency">Content Frequency</Label>
              <Select
                value={formData.frequency || ""}
                onValueChange={(value) => onChange("frequency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How often will you publish?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="sporadic">As needed/Sporadic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="goals">Content Goals</Label>
              <Textarea
                name="goals"
                placeholder="Brand awareness, lead generation, education, engagement..."
                value={formData.goals || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        );
      
      case "innovation":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="innovationType">Innovation Type</Label>
              <Select
                value={formData.innovationType || ""}
                onValueChange={(value) => onChange("innovationType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select innovation focus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incremental">Incremental Improvement</SelectItem>
                  <SelectItem value="disruptive">Disruptive Innovation</SelectItem>
                  <SelectItem value="breakthrough">Breakthrough Technology</SelectItem>
                  <SelectItem value="experience">Experience Innovation</SelectItem>
                  <SelectItem value="business-model">Business Model Innovation</SelectItem>
                  <SelectItem value="social">Social Innovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="targetMarket">Target Market</Label>
              <Input
                name="targetMarket"
                placeholder="Which market segment or user group?"
                value={formData.targetMarket || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="trends">Relevant Industry Trends</Label>
              <Textarea
                name="trends"
                placeholder="Technology trends, user behavior changes, market shifts..."
                value={formData.trends || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="capabilities">Available Capabilities</Label>
              <Textarea
                name="capabilities"
                placeholder="Technical capabilities, team skills, resources, partnerships..."
                value={formData.capabilities || ""}
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

export default IdeaForm;
