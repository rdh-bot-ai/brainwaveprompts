import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmailFormProps {
  formData: Record<string, any>;
  onChange: (field: string, value: any) => void;
  subCategory: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ formData, onChange, subCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  const renderSubCategoryFields = () => {
    switch (subCategory) {
      case "business":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="purpose">Email Purpose</Label>
              <Select
                value={formData.purpose || ""}
                onValueChange={(value) => onChange("purpose", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select email purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="request">Request</SelectItem>
                  <SelectItem value="introduction">Introduction</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="objective">Email Objective</Label>
              <Textarea
                name="objective"
                placeholder="What do you want to achieve with this email?"
                value={formData.objective || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                name="company"
                placeholder="Your company name"
                value={formData.company || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case "customer":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="issue">Customer Issue</Label>
              <Select
                value={formData.issue || ""}
                onValueChange={(value) => onChange("issue", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="inquiry">Inquiry</SelectItem>
                  <SelectItem value="technical">Technical Problem</SelectItem>
                  <SelectItem value="refund">Refund Request</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="specificDetails">Specific Details</Label>
              <Textarea
                name="specificDetails"
                placeholder="Describe the customer's specific situation and details"
                value={formData.specificDetails || ""}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="relatedIssues">Related Issues to Address</Label>
              <Textarea
                name="relatedIssues"
                placeholder="Any related concerns or potential follow-up issues"
                value={formData.relatedIssues || ""}
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
                placeholder="What are you promoting?"
                value={formData.product || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="benefits">Key Benefits</Label>
              <Textarea
                name="benefits"
                placeholder="Main benefits and value proposition"
                value={formData.benefits || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                name="audience"
                placeholder="Who is this email for?"
                value={formData.audience || ""}
                onChange={handleChange}
              />
            </div>
          </>
        );

      case "sales":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                name="targetAudience"
                placeholder="Job title/industry/company size"
                value={formData.targetAudience || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="product">Product/Service</Label>
              <Input
                name="product"
                placeholder="What are you selling?"
                value={formData.product || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="keyBenefits">Key Benefits (2-3)</Label>
              <Textarea
                name="keyBenefits"
                placeholder="Main benefits specific to their role and KPIs"
                value={formData.keyBenefits || ""}
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
              <Label htmlFor="emailPurpose">Email Purpose</Label>
              <Textarea
                name="emailPurpose"
                placeholder="What is the purpose of this email?"
                value={formData.emailPurpose || ""}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                name="recipient"
                placeholder="Who is receiving this email?"
                value={formData.recipient || ""}
                onChange={handleChange}
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
        <Label htmlFor="keyPoints">Key Points to Include</Label>
        <Textarea
          name="keyPoints"
          placeholder="Important points to cover in the email"
          value={formData.keyPoints || ""}
          onChange={handleChange}
          className="min-h-[80px]"
        />
      </div>
    </>
  );
};

export default EmailForm;