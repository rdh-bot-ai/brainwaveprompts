import { SubCategory } from "../types/subcategory-types";

export const KNOWLEDGE_SUBCATEGORIES: SubCategory[] = [
  {
    id: "guide",
    name: "How-to Guide",
    description: "Step-by-step instructions",
    defaultPrompt: "Create a comprehensive how-to guide for [process/task]. Include: \n\n1) Clear, descriptive title that specifies the exact outcome\n\n2) Introduction explaining the purpose and benefits of completing this process\n\n3) Required prerequisites (knowledge, permissions, tools, materials, etc.)\n\n4) Estimated time and difficulty level\n\n5) Step-by-step instructions with each step focused on one specific action\n\n6) Screenshots or image descriptions at key steps\n\n7) Tips, warnings, or notes highlighted separately from main instructions\n\n8) Troubleshooting section addressing common issues and their solutions\n\n9) Alternative methods or shortcuts for advanced users\n\n10) Success indicators so users know when they've completed correctly\n\n11) Next steps or related procedures to consider after completion\n\nOrganize information logically, use consistent formatting for different information types, and ensure the reading level is appropriate for the target audience.",
  },
  {
    id: "faq",
    name: "FAQ Content",
    description: "Common questions and answers",
    defaultPrompt: "Generate a thorough FAQ section about [topic]. Include at least 10 common questions with clear, concise answers. Structure with: \n\n1) Questions phrased exactly how users would ask them, including common phrasings and variations\n\n2) Questions organized in logical groups (basics, advanced, troubleshooting, etc.)\n\n3) Answers that directly address the specific question without unnecessary information\n\n4) Step-by-step instructions for process-related questions\n\n5) Links or references to related questions within answers where relevant\n\n6) Specific examples to illustrate complex points\n\n7) Definitions for technical terms or jargon when unavoidable\n\n8) Current information with dates for time-sensitive content\n\n9) Consistent answer format and tone throughout\n\n10) Content optimized for featured snippets with clear, direct language\n\nInclude questions covering different user knowledge levels and inquiry types (how-to, comparison, pricing, compatibility, etc.).",
  },
  {
    id: "glossary",
    name: "Glossary & Definitions",
    description: "Term explanations",
    defaultPrompt: "Create a glossary of [number] key terms related to [topic/industry]. For each term, provide a concise definition, contextual explanation, and where relevant, examples of usage.",
  },
  {
    id: "documentation",
    name: "Technical Documentation",
    description: "Detailed technical explanations",
    defaultPrompt: "Write technical documentation for [product/feature/system]. Include purpose, specifications, setup instructions, usage examples, API details if applicable, and common troubleshooting scenarios.",
  },
  {
    id: "training",
    name: "Training Materials",
    description: "Educational content",
    defaultPrompt: "Create training materials for [topic/skill]. Include learning objectives, key concepts, exercises, and assessment criteria.",
  },
  {
    id: "procedures",
    name: "Standard Procedures",
    description: "Process documentation",
    defaultPrompt: "Document standard operating procedures for [process]. Include step-by-step instructions, requirements, and troubleshooting guides.",
  },
  {
    id: "reference",
    name: "Quick Reference",
    description: "Quick guides and cheatsheets",
    defaultPrompt: "Create a quick reference guide for [topic/tool]. Include essential commands, common use cases, and best practices.",
  }
];
