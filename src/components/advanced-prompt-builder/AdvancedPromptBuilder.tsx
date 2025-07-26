import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, AlertTriangle, Sparkles, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  template: string;
  description: string;
}

interface PlaceholderConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  required: boolean;
  options?: string[];
  placeholder?: string;
  advanced?: boolean;
}

const SAMPLE_TEMPLATES: PromptTemplate[] = [
  {
    id: "social-media",
    name: "Social Media Post",
    category: "Content",
    template: "Create a social media post about [topic] for [platform] with the goal to [engagement_goal]. Include [key_points] and tailor it for [target_audience]. Keep the tone [tone].",
    description: "Generate engaging social media content"
  },
  {
    id: "blog-post",
    name: "Blog Post",
    category: "Content",
    template: "Write a comprehensive blog post about [topic] for [target_audience]. The post should be [word_count] words long and cover [key_points]. Use a [tone] tone and include [sections]. Format it for [platform].",
    description: "Create detailed blog content"
  },
  {
    id: "email-campaign",
    name: "Email Campaign",
    category: "Email",
    template: "Create an email campaign for [product] targeting [target_audience]. The email should [objective] and include [key_benefits]. Use a [tone] tone and include a clear [call_to_action].",
    description: "Design effective email campaigns"
  }
];

const ADVANCED_FIELDS = ["tone", "format", "voice", "style", "length", "complexity"];

const AdvancedPromptBuilder: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [placeholders, setPlaceholders] = useState<PlaceholderConfig[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Extract placeholders from template
  const extractPlaceholders = (template: string): string[] => {
    const regex = /\[([^\]]+)\]/g;
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(template)) !== null) {
      matches.push(match[1]);
    }
    return [...new Set(matches)];
  };

  // Generate placeholder configurations
  const generatePlaceholderConfigs = (placeholderNames: string[]): PlaceholderConfig[] => {
    return placeholderNames.map(name => {
      const label = name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const isAdvanced = ADVANCED_FIELDS.includes(name.toLowerCase());
      
      let config: PlaceholderConfig = {
        name,
        label,
        type: "text",
        required: !isAdvanced,
        advanced: isAdvanced
      };

      // Configure specific fields
      switch (name.toLowerCase()) {
        case "platform":
          config.type = "select";
          config.options = ["Facebook", "Twitter", "LinkedIn", "Instagram", "TikTok", "YouTube"];
          break;
        case "tone":
          config.type = "select";
          config.options = ["Professional", "Casual", "Friendly", "Authoritative", "Conversational", "Humorous"];
          config.advanced = true;
          break;
        case "target_audience":
          config.placeholder = "e.g., Young professionals, Tech enthusiasts";
          break;
        case "key_points":
        case "key_benefits":
        case "sections":
          config.type = "textarea";
          config.placeholder = "Enter each point on a new line";
          break;
        case "word_count":
          config.placeholder = "e.g., 500-800 words";
          break;
        case "engagement_goal":
          config.type = "select";
          config.options = ["Increase awareness", "Drive traffic", "Generate leads", "Boost engagement", "Promote product"];
          break;
        case "call_to_action":
          config.placeholder = "e.g., Sign up now, Learn more, Get started";
          break;
        case "objective":
          config.type = "select";
          config.options = ["Inform", "Persuade", "Educate", "Promote", "Announce"];
          break;
      }

      return config;
    });
  };

  // Update placeholders when template changes
  useEffect(() => {
    if (selectedTemplate) {
      const extractedPlaceholders = extractPlaceholders(selectedTemplate.template);
      const configs = generatePlaceholderConfigs(extractedPlaceholders);
      setPlaceholders(configs);
      
      // Reset form data but preserve existing values
      const newFormData: Record<string, string> = {};
      configs.forEach(config => {
        newFormData[config.name] = formData[config.name] || "";
      });
      setFormData(newFormData);
    }
  }, [selectedTemplate]);

  // Generate prompt in real-time
  useEffect(() => {
    if (selectedTemplate) {
      let prompt = selectedTemplate.template;
      
      placeholders.forEach(placeholder => {
        const value = formData[placeholder.name];
        if (value) {
          prompt = prompt.replace(new RegExp(`\\[${placeholder.name}\\]`, 'g'), value);
        }
      });
      
      setGeneratedPrompt(prompt);
    }
  }, [selectedTemplate, formData, placeholders]);

  // Validate form
  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    placeholders.forEach(placeholder => {
      if (placeholder.required && !formData[placeholder.name]?.trim()) {
        errors.push(placeholder.label);
      }
    });
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const regularFields = placeholders.filter(p => !p.advanced);
  const advancedFields = placeholders.filter(p => p.advanced);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Brainwave Prompt Builder</h1>
        </div>
        <p className="text-muted-foreground">
          Intelligent prompt generation with automatic template synchronization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Template</CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={selectedTemplate?.id || ""} 
                onValueChange={(value) => {
                  const template = SAMPLE_TEMPLATES.find(t => t.id === value);
                  setSelectedTemplate(template || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a prompt template..." />
                </SelectTrigger>
                <SelectContent>
                  {SAMPLE_TEMPLATES.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedTemplate && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <Badge variant="secondary" className="mb-2">{selectedTemplate.category}</Badge>
                  <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Fields */}
          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle>Configure Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Regular Fields */}
                {regularFields.map(placeholder => (
                  <div key={placeholder.name} className="space-y-2">
                    <Label className="flex items-center gap-1">
                      {placeholder.label}
                      {placeholder.required && <span className="text-destructive">*</span>}
                    </Label>
                    
                    {placeholder.type === "select" ? (
                      <Select 
                        value={formData[placeholder.name] || ""} 
                        onValueChange={(value) => handleFieldChange(placeholder.name, value)}
                      >
                        <SelectTrigger className={validationErrors.includes(placeholder.label) ? "border-destructive" : ""}>
                          <SelectValue placeholder={`Select ${placeholder.label.toLowerCase()}...`} />
                        </SelectTrigger>
                        <SelectContent>
                          {placeholder.options?.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : placeholder.type === "textarea" ? (
                      <Textarea
                        value={formData[placeholder.name] || ""}
                        onChange={(e) => handleFieldChange(placeholder.name, e.target.value)}
                        placeholder={placeholder.placeholder}
                        className={validationErrors.includes(placeholder.label) ? "border-destructive" : ""}
                        rows={3}
                      />
                    ) : (
                      <Input
                        value={formData[placeholder.name] || ""}
                        onChange={(e) => handleFieldChange(placeholder.name, e.target.value)}
                        placeholder={placeholder.placeholder}
                        className={validationErrors.includes(placeholder.label) ? "border-destructive" : ""}
                      />
                    )}
                  </div>
                ))}

                {/* Advanced Settings */}
                {advancedFields.length > 0 && (
                  <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between">
                        Advanced Settings
                        <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 pt-4">
                      {advancedFields.map(placeholder => (
                        <div key={placeholder.name} className="space-y-2">
                          <Label>{placeholder.label}</Label>
                          
                          {placeholder.type === "select" ? (
                            <Select 
                              value={formData[placeholder.name] || ""} 
                              onValueChange={(value) => handleFieldChange(placeholder.name, value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={`Select ${placeholder.label.toLowerCase()}...`} />
                              </SelectTrigger>
                              <SelectContent>
                                {placeholder.options?.map(option => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              value={formData[placeholder.name] || ""}
                              onChange={(e) => handleFieldChange(placeholder.name, e.target.value)}
                              placeholder={placeholder.placeholder}
                            />
                          )}
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Please fill in the required fields: {validationErrors.join(", ")}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Live Preview</CardTitle>
              {generatedPrompt && (
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {selectedTemplate ? (
                <div className="space-y-4">
                  <Textarea
                    value={generatedPrompt}
                    readOnly
                    className="min-h-[300px] bg-muted font-mono text-sm"
                    placeholder="Your generated prompt will appear here as you fill in the fields..."
                  />
                  
                  {/* Template Info */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Template: {selectedTemplate.name}</div>
                    <div>Placeholders found: {placeholders.length}</div>
                    <div>Required fields: {regularFields.filter(f => f.required).length}</div>
                    <div>Optional fields: {advancedFields.length}</div>
                  </div>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Select a template to see the live preview
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generate Button */}
          {selectedTemplate && (
            <Button 
              onClick={() => validateForm()}
              className="w-full"
              size="lg"
            >
              Validate & Generate Prompt
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedPromptBuilder;