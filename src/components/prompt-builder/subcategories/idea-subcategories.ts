
import { SubCategory } from "../types/subcategory-types";

export const IDEA_SUBCATEGORIES: SubCategory[] = [
  {
    id: "business",
    name: "Business Ideas",
    description: "Entrepreneurial concepts",
    defaultPrompt: "Help me brainstorm business ideas related to [challenge].",
  },
  {
    id: "product",
    name: "Product Concepts",
    description: "New product development ideas",
    defaultPrompt: "Generate product ideas that solve [challenge].",
  },
  {
    id: "solution",
    name: "Problem Solutions",
    description: "Approaches to solve challenges",
    defaultPrompt: "Brainstorm solutions for this problem: [challenge].",
  },
  {
    id: "creative",
    name: "Creative Concepts",
    description: "Artistic and creative ideas",
    defaultPrompt: "Generate creative concepts for [challenge].",
  },
  {
    id: "marketing",
    name: "Marketing Campaigns",
    description: "Marketing strategy ideas",
    defaultPrompt: "Generate marketing campaign ideas for [challenge].",
  },
  {
    id: "content-strategy",
    name: "Content Strategy",
    description: "Content planning ideas",
    defaultPrompt: "Develop content strategy ideas for [challenge].",
  },
  {
    id: "innovation",
    name: "Product Innovation",
    description: "New product/feature ideas",
    defaultPrompt: "Generate innovative product ideas that solve [challenge].",
  }
];
