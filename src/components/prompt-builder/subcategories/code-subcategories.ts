
import { SubCategory } from "../types/subcategory-types";

export const CODE_SUBCATEGORIES: SubCategory[] = [
  {
    id: "function",
    name: "Function/Method",
    description: "Individual code functions",
    defaultPrompt: "Write a [language] function that [functionality]. Include proper error handling for invalid inputs, edge cases (empty arrays, null values, etc.), and parameter validation with appropriate type checking. Add thorough inline comments explaining the approach, time/space complexity analysis, and include 2-3 usage examples showing different scenarios. If relevant, provide alternatives for optimizing performance or improving readability.",
  },
  {
    id: "component",
    name: "UI Component",
    description: "Frontend interface elements",
    defaultPrompt: "Create a reusable [language] UI component for [functionality]. The component should follow best practices for accessibility (ARIA attributes, keyboard navigation, focus management), include responsive design considerations (mobile, tablet, desktop breakpoints), and handle loading/error states gracefully. Provide props/parameters for customization including: appearance (size, color, variant), behavior (event callbacks), and content options. Include TypeScript interfaces/PropTypes for all props with appropriate documentation comments and handle common edge cases (empty data, long content, etc.). Show an example implementation demonstrating the component in use.",
  },
  {
    id: "algorithm",
    name: "Algorithm",
    description: "Efficient problem-solving code",
    defaultPrompt: "Implement an efficient algorithm in [language] to solve the following problem: [functionality]. First explain your approach, breaking down the problem and outlining your strategy. Then provide a thoroughly commented implementation with named constants/variables that clearly explain their purpose. Analyze the time and space complexity using Big O notation, explaining the reasoning behind your analysis. Compare your solution with at least one alternative approach, discussing tradeoffs. Include test cases covering edge cases, boundary conditions, and typical usage scenarios. Finally, suggest optimizations or improvements that could be made if needed.",
  },
  {
    id: "api",
    name: "API Integration",
    description: "Code to connect with external services",
    defaultPrompt: "Write [language] code to integrate with [specific API/service] to accomplish [functionality]. Include complete authentication handling with secure credential management (environment variables, tokens, API keys), comprehensive error handling for common API failures (rate limiting, authentication errors, network issues), retry logic with exponential backoff for transient failures, and response parsing with proper typing. Implement proper logging for debugging and monitoring. Structure the code following best practices in [language] for maintainable API clients, with separate concerns for request construction, authentication, error handling, and response processing. Include example usage scenarios showing how to use this integration in a real application context.",
  },
  {
    id: "testing",
    name: "Test Cases",
    description: "Unit & integration tests",
    defaultPrompt: "Write [language] test cases for [functionality] using an appropriate testing framework (Jest, Mocha, PyTest, etc.). Include a comprehensive test suite with: 1) Unit tests covering individual functions/methods with mocks/stubs for dependencies, 2) Integration tests for component interactions, 3) Edge case tests for boundary conditions, empty inputs, and error handling, 4) Performance tests if applicable. Follow test best practices including descriptive test names, proper setup/teardown, isolated tests, and helpful failure messages. Use appropriate assertions and matchers for different data types. Group tests logically and include a brief explanation of testing strategy. For UI components, include tests for accessibility and user interactions.",
  },
  {
    id: "refactor",
    name: "Code Refactoring",
    description: "Improve existing code",
    defaultPrompt: "Refactor this [language] code: [paste code]. Improve readability by using meaningful variable/function names, adding appropriate comments, and consistent formatting. Enhance maintainability by applying suitable design patterns, extracting reusable functions, and following SOLID principles. Optimize performance by identifying and resolving inefficient algorithms, unnecessary computations, and resource leaks. Improve error handling with proper try/catch blocks and informative error messages. Maintain the same functionality and interface while making the code more robust, readable, and efficient. Provide a brief explanation of the changes made and the reasoning behind them.",
  },
  {
    id: "database",
    name: "Database Queries",
    description: "SQL and database operations",
    defaultPrompt: "Write a [database type] query to [operation] that handles [requirements]. First, design an appropriate schema with table definitions, including column types, constraints, and relationships. Then create optimized queries with appropriate indexing recommendations to improve performance. Include considerations for query efficiency with large datasets, avoiding N+1 query problems, and proper join strategies. Add comments explaining the query logic and optimization choices. Provide example data and expected results to demonstrate the query in action. Consider transaction handling, concurrency, and data integrity protections where relevant. If using an ORM, include both the raw SQL and equivalent ORM code with appropriate configurations.",
  }
];
