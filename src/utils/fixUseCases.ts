import { USE_CASES } from "@/data/useCases";
import { fixUseCasePlaceholders, convertSnakeCaseToCamelCase } from "./placeholderValidator";

// Function to process and fix all use cases
export function processUseCases() {
  console.log("🔧 Processing use cases for placeholder consistency...");
  
  const processedUseCases = USE_CASES.map(useCase => {
    // Step 1: Convert snake_case to camelCase
    let processed = convertSnakeCaseToCamelCase(useCase);
    
    // Step 2: Fix placeholder mismatches
    processed = fixUseCasePlaceholders(processed);
    
    console.log(`✅ Processed: ${useCase.name}`);
    return processed;
  });
  
  return processedUseCases;
}

// Auto-fix function that can be run during development
export function autoFixUseCases() {
  const fixed = processUseCases();
  
  // In a real implementation, this would write back to the file
  console.log("Fixed use cases:", JSON.stringify(fixed, null, 2));
  
  return fixed;
}