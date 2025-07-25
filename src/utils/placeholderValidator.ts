import { UseCase, FieldConfig } from "@/data/useCases";

export interface ValidationResult {
  missingFields: string[];
  unusedFields: string[];
  isValid: boolean;
}

export function extractPlaceholders(template: string): string[] {
  const placeholderRegex = /{([a-zA-Z0-9_]+)}/g;
  const matches = [];
  let match;
  
  while ((match = placeholderRegex.exec(template)) !== null) {
    matches.push(match[1]);
  }
  
  return [...new Set(matches)]; // Remove duplicates
}

export function validatePlaceholders(useCase: UseCase): ValidationResult {
  const placeholders = extractPlaceholders(useCase.promptTemplate);
  const fieldIds = useCase.fields.map(field => field.id);
  
  const missingFields = placeholders.filter(placeholder => !fieldIds.includes(placeholder));
  const unusedFields = fieldIds.filter(fieldId => !placeholders.includes(fieldId));
  
  return {
    missingFields,
    unusedFields,
    isValid: missingFields.length === 0
  };
}

export function fixUseCasePlaceholders(useCase: UseCase): UseCase {
  const validation = validatePlaceholders(useCase);
  const updatedFields = [...useCase.fields];
  
  // Add missing fields
  validation.missingFields.forEach(placeholder => {
    const label = placeholder
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim();
    
    updatedFields.push({
      id: placeholder,
      label,
      type: "text",
      required: true
    });
  });
  
  // Mark unused fields as optional and add tooltip
  validation.unusedFields.forEach(fieldId => {
    const fieldIndex = updatedFields.findIndex(field => field.id === fieldId);
    if (fieldIndex !== -1) {
      updatedFields[fieldIndex] = {
        ...updatedFields[fieldIndex],
        optional: true,
        tooltip: "Not used in prompt yet"
      };
    }
  });
  
  return {
    ...useCase,
    fields: updatedFields
  };
}

export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

export function convertSnakeCaseToCamelCase(useCase: UseCase): UseCase {
  let updatedTemplate = useCase.promptTemplate;
  const updatedFields = useCase.fields.map(field => {
    const camelCaseId = toCamelCase(field.id);
    
    // Update template placeholders
    const snakeCasePattern = new RegExp(`{${field.id}}`, 'g');
    updatedTemplate = updatedTemplate.replace(snakeCasePattern, `{${camelCaseId}}`);
    
    return {
      ...field,
      id: camelCaseId
    };
  });
  
  return {
    ...useCase,
    fields: updatedFields,
    promptTemplate: updatedTemplate
  };
}

export function validateFormData(formData: Record<string, any>, useCase: UseCase): string[] {
  const validation = validatePlaceholders(useCase);
  const missingKeys = [];
  
  for (const placeholder of validation.missingFields) {
    if (!formData[placeholder] || formData[placeholder].toString().trim() === '') {
      missingKeys.push(placeholder);
    }
  }
  
  return missingKeys;
}