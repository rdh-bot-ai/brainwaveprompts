
import { SubCategory } from "../types/subcategory-types";

export const SEO_SUBCATEGORIES: SubCategory[] = [
  {
    id: "keyword",
    name: "Keyword Optimization",
    description: "Search term focused content",
    defaultPrompt: "Create SEO-optimized content about [topic] targeting the keyword '[keyword]'.",
  },
  {
    id: "title",
    name: "Title & Meta Content",
    description: "Search engine metadata",
    defaultPrompt: "Generate SEO-optimized title tags and meta descriptions for content about [topic].",
  },
  {
    id: "structure",
    name: "Content Structure",
    description: "SEO-friendly organization",
    defaultPrompt: "Create an SEO-optimized content structure for a page about [topic].",
  },
  {
    id: "local",
    name: "Local SEO",
    description: "Location-based optimization",
    defaultPrompt: "Develop local SEO content for [business type] in [location].",
  },
  {
    id: "competitor",
    name: "Competitor Analysis",
    description: "SEO competition research",
    defaultPrompt: "Analyze SEO competition for [keyword/topic] in [industry].",
  },
  {
    id: "technical-seo",
    name: "Technical SEO",
    description: "Technical optimization",
    defaultPrompt: "Create technical SEO recommendations for [website/page].",
  },
  {
    id: "local-content",
    name: "Local SEO Content",
    description: "Location-based optimization",
    defaultPrompt: "Generate local SEO content for [business] in [location].",
  }
];
