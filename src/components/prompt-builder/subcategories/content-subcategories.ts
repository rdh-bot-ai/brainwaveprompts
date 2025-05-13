
import { SubCategory } from "../types/subcategory-types";

export const CONTENT_SUBCATEGORIES: SubCategory[] = [
  {
    id: "blog",
    name: "Blog Post",
    description: "Engaging content for your blog",
    defaultPrompt: "Write a comprehensive blog post about [topic] that includes an engaging introduction, key sections on [key points], and a compelling conclusion. Include practical examples and actionable insights for readers.",
  },
  {
    id: "article",
    name: "Article",
    description: "In-depth informational content",
    defaultPrompt: "Create an informative article about [topic] that explores [key points] in detail. Include research-backed information, cite relevant sources, and organize content with clear headings and subheadings.",
  },
  {
    id: "social",
    name: "Social Media",
    description: "Engaging posts for social platforms",
    defaultPrompt: "Create a set of social media posts about [topic] optimized for engagement. Include attention-grabbing headlines, concise copy, relevant hashtags, and clear calls-to-action.",
  },
  {
    id: "email",
    name: "Email Content",
    description: "Newsletters, campaigns & outreach",
    defaultPrompt: "Write an email about [topic] with a compelling subject line, personalized greeting, clear value proposition, and specific call-to-action. Keep the tone conversational yet professional.",
  },
  {
    id: "technical",
    name: "Technical Writing",
    description: "Documentation & technical content",
    defaultPrompt: "Create technical content about [topic] for [audience level]. Include [key concepts], practical examples, and clear explanations of [technical details].",
  },
  {
    id: "script",
    name: "Video Script",
    description: "Scripts for video content",
    defaultPrompt: "Write a video script about [topic] that's [duration] long. Include an engaging hook, clear sections on [key points], and a strong call-to-action.",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Email newsletter content",
    defaultPrompt: "Create a newsletter about [topic] that includes [key updates], industry insights, and engaging content that will resonate with [target audience].",
  }
];
