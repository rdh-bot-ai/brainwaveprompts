
import { SubCategory } from "../types/subcategory-types";

export const OTHER_SUBCATEGORIES: SubCategory[] = [
  {
    id: "custom",
    name: "Custom Prompt",
    description: "Build your own prompt",
    defaultPrompt: "I need help with [describe your task]. Please provide [specific output].",
  },
  {
    id: "workflow",
    name: "Workflow Design",
    description: "Process and system planning",
    defaultPrompt: "Help me design a workflow for [process/task].",
  },
  {
    id: "speech",
    name: "Speech/Presentation",
    description: "Public speaking content",
    defaultPrompt: "Create a [length] speech/presentation about [topic] for [audience].",
  },
  {
    id: "critique",
    name: "Review & Critique",
    description: "Analysis and feedback",
    defaultPrompt: "Provide a constructive critique of this [content/work/idea]: [paste content or describe].",
  },
];
