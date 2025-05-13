
import { SubCategory } from "../types/subcategory-types";

export const RESEARCH_SUBCATEGORIES: SubCategory[] = [
  {
    id: "market",
    name: "Market Research",
    description: "Industry and market analysis",
    defaultPrompt: "Conduct research on [market/industry] focusing on [specific aspects]. Include key trends, competitive analysis, and market size data. Consider [specific factors] and their impact.",
  },
  {
    id: "academic",
    name: "Academic Research",
    description: "Scholarly analysis and literature review",
    defaultPrompt: "Perform a literature review on [topic] covering research from [time period]. Focus on [specific aspects], identify key findings, and highlight gaps in current research.",
  },
  {
    id: "competitor",
    name: "Competitor Analysis",
    description: "Detailed competitor research",
    defaultPrompt: "Analyze [competitor names] in terms of [specific aspects]. Include strengths, weaknesses, unique selling propositions, and market positioning. Focus on [key metrics].",
  },
  {
    id: "topic",
    name: "Topic Research",
    description: "Information gathering on subjects",
    defaultPrompt: "Research the topic of [topic] and provide a comprehensive overview. Include key concepts, historical context, current developments, major debates, and cite credible sources throughout.",
  },
  {
    id: "compare",
    name: "Comparison Analysis",
    description: "Contrasting multiple options",
    defaultPrompt: "Compare and contrast [option 1] and [option 2] in terms of [criteria]. Provide a balanced analysis of strengths and weaknesses for each, supported by data and expert opinions where possible.",
  },
  {
    id: "trends",
    name: "Trend Analysis",
    description: "Identifying patterns and movements",
    defaultPrompt: "Analyze current trends in [field/industry] with a focus on [specific aspect]. Identify emerging patterns, key driving factors, potential future developments, and implications for [relevant stakeholders].",
  },
  {
    id: "literature",
    name: "Literature Review",
    description: "Academic research synthesis",
    defaultPrompt: "Conduct a literature review on [topic] covering key academic papers and research findings. Synthesize the major contributions, methodologies, findings, and identify gaps in the current research.",
  },
  {
    id: "consumer",
    name: "Consumer Research",
    description: "Customer behavior analysis",
    defaultPrompt: "Research consumer behavior patterns for [product/service] in [market]. Focus on preferences, pain points, and decision factors.",
  },
  {
    id: "technology",
    name: "Technology Research",
    description: "Tech trends and analysis",
    defaultPrompt: "Research emerging technologies in [field/industry]. Analyze potential impacts, adoption trends, and implementation considerations.",
  },
  {
    id: "sustainability",
    name: "Sustainability Research",
    description: "Environmental impact studies",
    defaultPrompt: "Research sustainability practices in [industry/sector]. Focus on environmental impact, regulations, and improvement opportunities.",
  }
];
