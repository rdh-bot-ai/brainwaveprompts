
import { SubCategory } from "../types/subcategory-types";

export const KNOWLEDGE_SUBCATEGORIES: SubCategory[] = [
  {
    id: "guide",
    name: "How-to Guide",
    description: "Step-by-step instructions",
    defaultPrompt: "Create a comprehensive how-to guide for [process/task]. Include step-by-step instructions, prerequisites, required tools/materials, troubleshooting tips, and visual description suggestions where applicable.",
  },
  {
    id: "faq",
    name: "FAQ Content",
    description: "Common questions and answers",
    defaultPrompt: "Generate a thorough FAQ section about [topic]. Include at least 10 common questions with clear, concise answers. Structure the content to be both user-friendly and optimized for featured snippets.",
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
