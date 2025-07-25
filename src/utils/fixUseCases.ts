import { fixUseCasePlaceholders, validatePlaceholders, convertSnakeCaseToCamelCase } from "./placeholderValidator";
import { USE_CASES } from "@/data/useCases";

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

// Utility to auto-fix use cases and report changes
export function autoFixUseCases() {
  console.log('🔧 Auto-fixing use cases...\n');
  
  let hasChanges = false;
  
  const fixedUseCases = USE_CASES.map(useCase => {
    const validation = validatePlaceholders(useCase);
    
    if (!validation.isValid || validation.unusedFields.length > 0) {
      hasChanges = true;
      console.log(`📝 Fixing ${useCase.name}:`);
      
      if (validation.missingFields.length > 0) {
        console.log(`  + Adding fields: ${validation.missingFields.join(', ')}`);
      }
      
      if (validation.unusedFields.length > 0) {
        console.log(`  ⚠ Marking unused: ${validation.unusedFields.join(', ')}`);
      }
      
      return fixUseCasePlaceholders(useCase);
    }
    
    return useCase;
  });
  
  if (!hasChanges) {
    console.log('✅ All use cases are already valid!');
  } else {
    console.log('\n🎉 Auto-fix completed!');
  }
  
  return fixedUseCases;
}

// Export individual functions for testing
export { fixUseCasePlaceholders } from "./placeholderValidator";