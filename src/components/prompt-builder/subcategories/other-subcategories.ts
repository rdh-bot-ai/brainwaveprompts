
import { SubCategory } from "../types/subcategory-types";

export const OTHER_SUBCATEGORIES: SubCategory[] = [
  {
    id: "custom",
    name: "Custom Prompt",
    description: "Build your own prompt",
    defaultPrompt: "I need help with [describe your task]. Please provide [specific output] that includes [key elements]. The tone should be [preferred tone], and the detail level should be [basic/moderate/detailed].",
  },
  {
    id: "workflow",
    name: "Workflow Design",
    description: "Process and system planning",
    defaultPrompt: "Help me design a workflow for [process/task]. Break down the process into clear stages, identify key stakeholders, list required resources, note decision points, and suggest efficiency improvements.",
  },
  {
    id: "speech",
    name: "Speech/Presentation",
    description: "Public speaking content",
    defaultPrompt: "Create a [length] speech/presentation about [topic] for [audience]. Include an attention-grabbing opening, clear structure with key points, compelling examples/stories, and a memorable conclusion.",
  },
  {
    id: "critique",
    name: "Review & Critique",
    description: "Analysis and feedback",
    defaultPrompt: "Provide a constructive critique of this [content/work/idea]: [paste content or describe]. Analyze strengths, areas for improvement, consider [specific aspects], and suggest specific, actionable improvements.",
  },
];
