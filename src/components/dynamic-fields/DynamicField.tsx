import React from "react";
import { nanoid } from "nanoid";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { FieldConfig } from "@/data/useCases";

interface DynamicFieldProps {
  field: FieldConfig;
  value: any;
  onChange: (fieldId: string, value: any) => void;
}

const DynamicField: React.FC<DynamicFieldProps> = ({ field, value, onChange }) => {
  const inputId = React.useRef(nanoid()).current;

  const handleChange = (newValue: any) => {
    onChange(field.id, newValue);
  };

  const renderField = () => {
    switch (field.type) {
      case "text":
        return (
          <Input
            id={inputId}
            type="text"
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required={field.required}
          />
        );
      
      case "number":
        return (
          <Input
            id={inputId}
            type="number"
            value={value || ""}
            onChange={(e) => handleChange(Number(e.target.value))}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required={field.required}
          />
        );
      
      case "textarea":
        return (
          <Textarea
            id={inputId}
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required={field.required}
            className="min-h-[80px]"
          />
        );
      
      case "select":
        return (
          <Select value={value || ""} onValueChange={handleChange}>
            <SelectTrigger id={inputId}>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case "tags":
        return (
          <div className="space-y-2">
            <Input
              id={inputId}
              type="text"
              placeholder="Enter tags separated by commas"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const inputValue = e.currentTarget.value.trim();
                  if (inputValue) {
                    const currentTags = Array.isArray(value) ? value : [];
                    const newTags = inputValue.split(',').map(tag => tag.trim()).filter(tag => tag);
                    const updatedTags = [...new Set([...currentTags, ...newTags])];
                    handleChange(updatedTags);
                    e.currentTarget.value = '';
                  }
                }
              }}
            />
            {Array.isArray(value) && value.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {value.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedTags = value.filter((_: string, i: number) => i !== index);
                        handleChange(updatedTags);
                      }}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Label htmlFor={inputId} className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {field.tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{field.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {renderField()}
    </div>
  );
};

export default DynamicField;