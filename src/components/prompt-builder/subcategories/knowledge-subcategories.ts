
import { SubCategory } from "../types/subcategory-types";

export const KNOWLEDGE_SUBCATEGORIES: SubCategory[] = [
  {
    id: "guide",
    name: "How-to Guide",
    description: "Step-by-step instructions",
    defaultPrompt: "Create a how-to guide for [process/task].",
  },
  {
    id: "faq",
    name: "FAQ Content",
    description: "Common questions and answers",
    defaultPrompt: "Generate a FAQ section about [topic]. Include common questions with clear answers.",
  },
  {
    id: "glossary",
    name: "Glossary & Definitions",
    description: "Term explanations",
    defaultPrompt: "Create a glossary of [number] key terms related to [topic/industry].",
  },
  {
    id: "documentation",
    name: "Technical Documentation",
    description: "Detailed technical explanations",
    defaultPrompt: "Write technical documentation for [product/feature/system].",
  },
  {
    id: "training",
    name: "Training Materials",
    description: "Educational content",
    defaultPrompt: "Create training materials for [topic/skill].",
  },
  {
    id: "procedures",
    name: "Standard Procedures",
    description: "Process documentation",
    defaultPrompt: "Document standard operating procedures for [process].",
  },
  {
    id: "reference",
    name: "Quick Reference",
    description: "Quick guides and cheatsheets",
    defaultPrompt: "Create a quick reference guide for [topic/tool].",
  }
];
