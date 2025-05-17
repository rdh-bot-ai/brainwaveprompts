import { SubCategory } from "../types/subcategory-types";

export const OTHER_SUBCATEGORIES: SubCategory[] = [
  {
    id: "custom",
    name: "Custom Prompt",
    description: "Build your own prompt",
    defaultPrompt: "I need help with [describe your task]. Please provide [specific output] that includes: \n\n1) [First key element or requirement]\n\n2) [Second key element or requirement]\n\n3) [Third key element or requirement]\n\n4) [Additional requirements as needed]\n\nThe tone should be [preferred tone], and the detail level should be [basic/moderate/detailed].",
  },
  {
    id: "workflow",
    name: "Workflow Design",
    description: "Process and system planning",
    defaultPrompt: "Help me design a workflow for [process/task]. Include: \n\n1) A breakdown of the process into clear sequential stages\n\n2) Key stakeholders involved at each stage and their responsibilities\n\n3) Required resources, tools, and information needed at each step\n\n4) Decision points with criteria and alternative paths\n\n5) Expected timeframes for each stage\n\n6) Potential bottlenecks and mitigation strategies\n\n7) Quality control checkpoints and criteria\n\n8) Suggested automations or efficiency improvements\n\n9) Integration points with existing systems or processes\n\n10) Success metrics to evaluate workflow performance\n\nConsider both ideal state and practical implementation challenges, with recommendations for phased implementation if appropriate.",
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
