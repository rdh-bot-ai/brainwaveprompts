
import { SubCategory } from "../types/subcategory-types";

export const SEO_SUBCATEGORIES: SubCategory[] = [
  {
    id: "keyword",
    name: "Keyword Optimization",
    description: "Search term focused content",
    defaultPrompt: "Create SEO-optimized content about [topic] targeting the keyword '[keyword]'. Include appropriate keyword density, semantic related terms, proper heading structure, and meta description suggestions.",
  },
  {
    id: "title",
    name: "Title & Meta Content",
    description: "Search engine metadata",
    defaultPrompt: "Generate 5-10 SEO-optimized title tags and meta descriptions for content about [topic]. Ensure titles are under 60 characters, meta descriptions under 160 characters, and both include the target keyword '[keyword]'.",
  },
  {
    id: "structure",
    name: "Content Structure",
    description: "SEO-friendly organization",
    defaultPrompt: "Create an SEO-optimized content structure for a page about [topic]. Include H1, H2, and H3 heading suggestions, paragraph topics, and recommendations for internal linking opportunities.",
  },
  {
    id: "local",
    name: "Local SEO",
    description: "Location-based optimization",
    defaultPrompt: "Develop local SEO content for [business type] in [location]. Include locally relevant keywords, NAP information structure, Google Business Profile optimization suggestions, and local schema markup recommendations.",
  },
  {
    id: "competitor",
    name: "Competitor Analysis",
    description: "SEO competition research",
    defaultPrompt: "Analyze SEO competition for [keyword/topic] in [industry]. Include gaps, opportunities, and strategic recommendations.",
  },
  {
    id: "technical-seo",
    name: "Technical SEO",
    description: "Technical optimization",
    defaultPrompt: "Create technical SEO recommendations for [website/page]. Include structure, metadata, schema markup, and performance optimization suggestions.",
  },
  {
    id: "local-content",
    name: "Local SEO Content",
    description: "Location-based optimization",
    defaultPrompt: "Generate local SEO content for [business] in [location]. Include local keywords, business information, and location-specific details.",
  }
];
