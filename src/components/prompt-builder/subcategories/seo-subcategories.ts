import { SubCategory } from "../types/subcategory-types";

export const SEO_SUBCATEGORIES: SubCategory[] = [
  {
    id: "keyword",
    name: "Keyword Optimization",
    description: "Search term focused content",
    defaultPrompt: "Create SEO-optimized content about [topic] targeting the keyword '[keyword]'. Include: \n\n1) H1 title that naturally incorporates the target keyword while being compelling to readers\n\n2) Strategic keyword placement in the first paragraph, maintaining natural flow\n\n3) Appropriate keyword density (approximately 1-2%) without keyword stuffing\n\n4) Semantic related terms and LSI keywords to support the main keyword\n\n5) Proper heading structure with H2s and H3s that include relevant keyword variations\n\n6) Image alt text suggestions that incorporate keywords naturally\n\n7) Internal linking opportunities to related content\n\n8) External linking suggestions to authoritative sources\n\n9) Meta description suggestion under 160 characters that includes the keyword and drives click-through\n\n10) FAQ section addressing common user queries related to the keyword\n\nEnsure the content provides genuine value to readers while being optimized for search engines. Balance keyword optimization with readability and engagement.",
  },
  {
    id: "title",
    name: "Title & Meta Content",
    description: "Search engine metadata",
    defaultPrompt: "Generate 5-10 SEO-optimized title tags and meta descriptions for content about [topic]. For each variation: \n\n1) Title tag under 60 characters that includes the target keyword '[keyword]' near the beginning\n\n2) Title that uses power words, numbers, or parenthetical phrases to increase CTR\n\n3) Meta description under 160 characters that includes the target keyword naturally\n\n4) Meta description with a clear value proposition and call-to-action\n\n5) Different angles/approaches for the same content to test performance\n\nEnsure titles are descriptive yet concise, avoiding clickbait tactics while maintaining accuracy about the page content. Meta descriptions should expand on the title, highlight unique selling points, and create urgency or curiosity when appropriate. Include both informational and commercial intent variations if applicable to the content type.",
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
