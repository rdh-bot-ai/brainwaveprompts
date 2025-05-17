
import { SubCategory } from "../types/subcategory-types";

export const CONTENT_SUBCATEGORIES: SubCategory[] = [
  {
    id: "blog",
    name: "Blog Post",
    description: "Engaging content for your blog",
    defaultPrompt: "Write a comprehensive blog post about [topic] that includes: [key points]",
  },
  {
    id: "article",
    name: "Article",
    description: "In-depth informational content",
    defaultPrompt: "Create an informative article about [topic] that explores [key points] in detail.",
  },
  {
    id: "social",
    name: "Social Media",
    description: "Engaging posts for social platforms",
    defaultPrompt: "Create social media posts about [topic].",
  },
  {
    id: "email",
    name: "Email Content",
    description: "Newsletters, campaigns & outreach",
    defaultPrompt: "Write an email about [topic] with [key points].",
  },
  {
    id: "technical",
    name: "Technical Writing",
    description: "Documentation & technical content",
    defaultPrompt: "Create technical content about [topic] for target audience.",
  },
  {
    id: "script",
    name: "Video Script",
    description: "Scripts for video content",
    defaultPrompt: "Write a video script about [topic] that includes [key points].",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Email newsletter content",
    defaultPrompt: "Create a newsletter about [topic] that includes [key points].",
  }
];
