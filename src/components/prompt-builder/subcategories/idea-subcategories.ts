
import { SubCategory } from "../types/subcategory-types";

export const IDEA_SUBCATEGORIES: SubCategory[] = [
  {
    id: "business",
    name: "Business Ideas",
    description: "Entrepreneurial concepts",
    defaultPrompt: "Help me brainstorm innovative business ideas related to [challenge]. Consider market gaps, current trends in [context], and viable solutions that could be developed with [constraints] in mind.",
  },
  {
    id: "product",
    name: "Product Concepts",
    description: "New product development ideas",
    defaultPrompt: "Generate product ideas that solve [challenge]. Focus on user needs, market differentiation, and feasibility given [constraints]. Include potential features, target audience, and unique selling points.",
  },
  {
    id: "solution",
    name: "Problem Solutions",
    description: "Approaches to solve challenges",
    defaultPrompt: "Brainstorm solutions for this problem: [challenge]. Consider different approaches, methodologies, and frameworks that could address this issue within [context] and [constraints].",
  },
  {
    id: "creative",
    name: "Creative Concepts",
    description: "Artistic and creative ideas",
    defaultPrompt: "Generate creative concepts for [challenge] that are innovative and original. Explore different artistic directions, themes, and executions that could resonate with [context].",
  },
  {
    id: "marketing",
    name: "Marketing Campaigns",
    description: "Marketing strategy ideas",
    defaultPrompt: "Generate marketing campaign ideas for [product/service] targeting [audience]. Consider [budget/constraints] and focus on [objectives].",
  },
  {
    id: "content-strategy",
    name: "Content Strategy",
    description: "Content planning ideas",
    defaultPrompt: "Develop content strategy ideas for [platform/channel] to reach [target audience]. Include content themes, formats, and distribution approaches.",
  },
  {
    id: "innovation",
    name: "Product Innovation",
    description: "New product/feature ideas",
    defaultPrompt: "Generate innovative product ideas that solve [problem] for [target market]. Consider [industry trends] and [technological capabilities].",
  }
];
