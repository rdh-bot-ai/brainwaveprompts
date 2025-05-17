
import { SubCategory } from "../types/subcategory-types";

export const RESEARCH_SUBCATEGORIES: SubCategory[] = [
  {
    id: "market",
    name: "Market Research",
    description: "Industry and market analysis",
    defaultPrompt: "Conduct research on [market/industry] focusing on [specific aspects].",
  },
  {
    id: "academic",
    name: "Academic Research",
    description: "Scholarly analysis and literature review",
    defaultPrompt: "Perform a literature review on [topic] covering research from [time period].",
  },
  {
    id: "competitor",
    name: "Competitor Analysis",
    description: "Detailed competitor research",
    defaultPrompt: "Analyze [competitor names] in terms of [specific aspects].",
  },
  {
    id: "topic",
    name: "Topic Research",
    description: "Information gathering on subjects",
    defaultPrompt: "Research the topic of [topic] and provide a comprehensive overview.",
  },
  {
    id: "compare",
    name: "Comparison Analysis",
    description: "Contrasting multiple options",
    defaultPrompt: "Compare and contrast [option 1] and [option 2] in terms of [criteria].",
  },
  {
    id: "trends",
    name: "Trend Analysis",
    description: "Identifying patterns and movements",
    defaultPrompt: "Analyze current trends in [field/industry] with a focus on [specific aspect].",
  },
  {
    id: "literature",
    name: "Literature Review",
    description: "Academic research synthesis",
    defaultPrompt: "Conduct a literature review on [topic] covering key academic papers.",
  },
  {
    id: "consumer",
    name: "Consumer Research",
    description: "Customer behavior analysis",
    defaultPrompt: "Research consumer behavior patterns for [product/service] in [market].",
  },
  {
    id: "technology",
    name: "Technology Research",
    description: "Tech trends and analysis",
    defaultPrompt: "Research emerging technologies in [field/industry].",
  },
  {
    id: "sustainability",
    name: "Sustainability Research",
    description: "Environmental impact studies",
    defaultPrompt: "Research sustainability practices in [industry/sector].",
  }
];
