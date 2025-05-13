
import { SubCategory } from "../types/subcategory-types";

export const CODE_SUBCATEGORIES: SubCategory[] = [
  {
    id: "function",
    name: "Function/Method",
    description: "Individual code functions",
    defaultPrompt: "Write a [language] function that [functionality]. Include proper error handling, parameter validation, and thorough comments explaining the approach and usage examples.",
  },
  {
    id: "component",
    name: "UI Component",
    description: "Frontend interface elements",
    defaultPrompt: "Create a reusable [language] UI component for [functionality]. Include props/parameters for customization, styling options, and handle common edge cases. Document usage with examples.",
  },
  {
    id: "algorithm",
    name: "Algorithm",
    description: "Efficient problem-solving code",
    defaultPrompt: "Implement an efficient algorithm in [language] to solve the following problem: [functionality]. Analyze the time and space complexity, and explain your approach with detailed comments.",
  },
  {
    id: "api",
    name: "API Integration",
    description: "Code to connect with external services",
    defaultPrompt: "Write [language] code to integrate with [specific API/service] to accomplish [functionality]. Include authentication handling, error management, and example usage scenarios.",
  },
  {
    id: "testing",
    name: "Test Cases",
    description: "Unit & integration tests",
    defaultPrompt: "Write [language] test cases for [functionality]. Include unit tests for edge cases, integration scenarios, and proper test documentation.",
  },
  {
    id: "refactor",
    name: "Code Refactoring",
    description: "Improve existing code",
    defaultPrompt: "Refactor this [language] code: [paste code]. Improve readability, maintainability, and performance while maintaining the same functionality.",
  },
  {
    id: "database",
    name: "Database Queries",
    description: "SQL and database operations",
    defaultPrompt: "Write a [database type] query to [operation] that handles [requirements]. Include proper indexing and optimization considerations.",
  }
];
