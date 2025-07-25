#!/usr/bin/env node

import { USE_CASES } from '../src/data/useCases.js';
import { validatePlaceholders } from '../src/utils/placeholderValidator.js';

let hasErrors = false;

console.log('🔍 Checking placeholder consistency...\n');

USE_CASES.forEach(useCase => {
  const validation = validatePlaceholders(useCase);
  
  if (!validation.isValid) {
    hasErrors = true;
    console.log(`❌ ${useCase.name} (${useCase.id}):`);
    
    if (validation.missingFields.length > 0) {
      console.log(`  Missing fields: ${validation.missingFields.join(', ')}`);
    }
    
    if (validation.unusedFields.length > 0) {
      console.log(`  Unused fields: ${validation.unusedFields.join(', ')}`);
    }
    
    console.log('');
  } else {
    console.log(`✅ ${useCase.name}`);
  }
});

if (hasErrors) {
  console.log('\n❌ Placeholder validation failed! Fix the issues above.');
  process.exit(1);
} else {
  console.log('\n✅ All placeholder validations passed!');
  process.exit(0);
}