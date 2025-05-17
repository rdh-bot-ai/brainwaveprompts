
import { SubCategory } from "../types/subcategory-types";

export const OTHER_SUBCATEGORIES: SubCategory[] = [
  {
    id: "custom",
    name: "Custom Prompt",
    description: "Build your own prompt",
    defaultPrompt: "Write your own prompt here...",
  },
  {
    id: "workflow",
    name: "Workflow Design",
    description: "Process and system planning",
    defaultPrompt: "Design a workflow for:",
  },
  {
    id: "speech",
    name: "Speech/Presentation",
    description: "Public speaking content",
    defaultPrompt: "Create a speech about:",
  },
  {
    id: "critique",
    name: "Review & Critique",
    description: "Analysis and feedback",
    defaultPrompt: "Provide a critique of:",
  },
];
