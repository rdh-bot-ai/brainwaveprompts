
import { SubCategory } from "../types/subcategory-types";

export const CODE_SUBCATEGORIES: SubCategory[] = [
  {
    id: "function",
    name: "Function/Method",
    description: "Individual code functions",
    defaultPrompt: "Write a [language] function that [functionality].",
  },
  {
    id: "component",
    name: "UI Component",
    description: "Frontend interface elements",
    defaultPrompt: "Create a reusable [language] UI component for [functionality].",
  },
  {
    id: "algorithm",
    name: "Algorithm",
    description: "Efficient problem-solving code",
    defaultPrompt: "Implement an efficient algorithm in [language] to solve the following problem: [functionality].",
  },
  {
    id: "api",
    name: "API Integration",
    description: "Code to connect with external services",
    defaultPrompt: "Write [language] code to integrate with an API to accomplish [functionality].",
  },
  {
    id: "testing",
    name: "Test Cases",
    description: "Unit & integration tests",
    defaultPrompt: "Write [language] test cases for [functionality].",
  },
  {
    id: "refactor",
    name: "Code Refactoring",
    description: "Improve existing code",
    defaultPrompt: "Refactor this [language] code to improve [functionality].",
  },
  {
    id: "database",
    name: "Database Queries",
    description: "SQL and database operations",
    defaultPrompt: "Write a [language] database query to [functionality].",
  }
];
