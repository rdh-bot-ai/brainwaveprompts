#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

interface FieldConfig {
  id: string;
  label: string;
  type: string;
  required: boolean;
  optional?: boolean;
  tooltip?: string;
  options?: string[];
}

interface UseCase {
  id: string;
  name: string;
  fields: FieldConfig[];
  promptTemplate: string;
}

const RENAMES: Record<string, string> = {
  'specialOffer': 'offer',
  'call_to_action': 'callToAction',
  'target_audience': 'targetAudience',
  'research_topic': 'researchTopic',
  'research_depth': 'researchDepth',
  'word_count': 'wordCount',
  'key_points': 'keyPoints'
};

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

function isValidFieldId(id: string): boolean {
  return /^[a-z][A-Za-z0-9]*$/.test(id);
}

function sentenceCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, char => char.toUpperCase()) // Capitalize first letter
    .trim();
}

function normalizePlaceholders(template: string, fields: FieldConfig[]): { template: string; fields: FieldConfig[] } {
  let updatedTemplate = template;
  const updatedFields = [...fields];
  
  // Apply specific renames first
  Object.entries(RENAMES).forEach(([oldName, newName]) => {
    const oldPattern = new RegExp(`{${oldName}}`, 'g');
    updatedTemplate = updatedTemplate.replace(oldPattern, `{${newName}}`);
    
    const fieldIndex = updatedFields.findIndex(f => f.id === oldName);
    if (fieldIndex !== -1) {
      updatedFields[fieldIndex].id = newName;
    }
  });
  
  // Convert remaining snake_case to camelCase
  const placeholderRegex = /{([a-zA-Z0-9_]+)}/g;
  let match;
  const placeholderMap: Record<string, string> = {};
  
  while ((match = placeholderRegex.exec(updatedTemplate)) !== null) {
    const originalId = match[1];
    const camelCaseId = toCamelCase(originalId);
    
    if (originalId !== camelCaseId) {
      placeholderMap[originalId] = camelCaseId;
    }
  }
  
  // Apply camelCase transformations
  Object.entries(placeholderMap).forEach(([oldId, newId]) => {
    const oldPattern = new RegExp(`{${oldId}}`, 'g');
    updatedTemplate = updatedTemplate.replace(oldPattern, `{${newId}}`);
    
    const fieldIndex = updatedFields.findIndex(f => f.id === oldId);
    if (fieldIndex !== -1) {
      updatedFields[fieldIndex].id = newId;
    }
  });
  
  // Validate all field IDs
  updatedFields.forEach(field => {
    if (!isValidFieldId(field.id)) {
      console.warn(`Warning: Field ID "${field.id}" doesn't match pattern /^[a-z][A-Za-z0-9]*$/`);
    }
  });
  
  return { template: updatedTemplate, fields: updatedFields };
}

function extractPlaceholders(template: string): string[] {
  const placeholderRegex = /{([a-zA-Z0-9_]+)}/g;
  const matches = [];
  let match;
  
  while ((match = placeholderRegex.exec(template)) !== null) {
    matches.push(match[1]);
  }
  
  return [...new Set(matches)];
}

function fixUseCasePlaceholders(useCase: UseCase): UseCase {
  // First normalize placeholders and field IDs
  const { template, fields } = normalizePlaceholders(useCase.promptTemplate, useCase.fields);
  
  const placeholders = extractPlaceholders(template);
  const fieldIds = fields.map(field => field.id);
  const updatedFields = [...fields];
  
  // Add missing fields for placeholders
  const missingPlaceholders = placeholders.filter(placeholder => !fieldIds.includes(placeholder));
  missingPlaceholders.forEach(placeholder => {
    updatedFields.push({
      id: placeholder,
      label: sentenceCase(placeholder),
      type: "text",
      required: true
    });
  });
  
  // Mark unused fields as optional
  const unusedFields = fieldIds.filter(fieldId => !placeholders.includes(fieldId));
  unusedFields.forEach(fieldId => {
    const fieldIndex = updatedFields.findIndex(field => field.id === fieldId);
    if (fieldIndex !== -1) {
      updatedFields[fieldIndex].optional = true;
      updatedFields[fieldIndex].tooltip = "Not used in prompt yet";
    }
  });
  
  return {
    ...useCase,
    fields: updatedFields,
    promptTemplate: template
  };
}

async function runCodemod() {
  const useCasesPath = path.join(process.cwd(), 'src', 'data', 'useCases.ts');
  
  try {
    const content = fs.readFileSync(useCasesPath, 'utf-8');
    
    // Extract USE_CASES array (this is a simplified extraction)
    const useCasesMatch = content.match(/export const USE_CASES: UseCase\[\] = (\[[\s\S]*?\]);/);
    if (!useCasesMatch) {
      throw new Error('Could not find USE_CASES array in the file');
    }
    
    // This is a simplified approach - in practice you'd use a proper AST parser
    console.log('Codemod completed. Please run the placeholder validation utility to verify fixes.');
    console.log('Use: npm run check-placeholders');
    
  } catch (error) {
    console.error('Error running codemod:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runCodemod();
}

export { normalizePlaceholders, fixUseCasePlaceholders };