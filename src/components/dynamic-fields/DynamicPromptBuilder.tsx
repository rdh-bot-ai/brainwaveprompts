import React, { useState, useEffect } from "react";
import { UseCase, USE_CASES } from "@/data/useCases";
import { validateFormData, extractPlaceholders } from "@/utils/placeholderValidator";
import DynamicField from "./DynamicField";
import MarkdownPreview from "./MarkdownPreview";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

const DynamicPromptBuilder: React.FC = () => {
  const [selectedUseCaseId, setSelectedUseCaseId] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const selectedUseCase = USE_CASES.find(uc => uc.id === selectedUseCaseId);

  // Reset form data when use case changes
  useEffect(() => {
    if (selectedUseCase) {
      setFormData({});
      setValidationErrors([]);
    }
  }, [selectedUseCaseId]);

  // Generate prompt when form data changes
  useEffect(() => {
    if (selectedUseCase && Object.keys(formData).length > 0) {
      let prompt = selectedUseCase.promptTemplate;
      
      // Replace placeholders with form data
      const placeholders = extractPlaceholders(prompt);
      placeholders.forEach(placeholder => {
        const value = formData[placeholder];
        if (value) {
          const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
          prompt = prompt.replace(new RegExp(`{${placeholder}}`, 'g'), displayValue);
        }
      });
      
      setGeneratedPrompt(prompt);
    } else {
      setGeneratedPrompt("");
    }
  }, [formData, selectedUseCase]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleGenerate = () => {
    if (!selectedUseCase) return;
    
    const errors = validateFormData(formData, selectedUseCase);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors([]);
    // Additional generation logic could go here
    console.log("Generated prompt:", generatedPrompt);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Select Use Case</Label>
          <Select value={selectedUseCaseId} onValueChange={setSelectedUseCaseId}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Choose a use case..." />
            </SelectTrigger>
            <SelectContent>
              {USE_CASES.map(useCase => (
                <SelectItem key={useCase.id} value={useCase.id}>
                  {useCase.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedUseCase && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Configure Parameters</h3>
              
              {selectedUseCase.fields.map(field => (
                <DynamicField
                  key={field.id}
                  field={field}
                  value={formData[field.id]}
                  onChange={handleFieldChange}
                />
              ))}

              {validationErrors.length > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Missing required fields: {validationErrors.join(", ")}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleGenerate} 
                className="w-full"
                disabled={!selectedUseCase}
              >
                Generate Prompt
              </Button>
            </div>

            {/* Preview */}
            <div>
              <MarkdownPreview 
                content={generatedPrompt} 
                title="Generated Prompt Preview"
                formState={formData}
                template={selectedUseCase?.promptTemplate}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicPromptBuilder;