import { SubCategory } from "../types/subcategory-types";

export const RESEARCH_SUBCATEGORIES: SubCategory[] = [
  {
    id: "market",
    name: "Market Research",
    description: "Industry and market analysis",
    defaultPrompt: "Conduct research on [market/industry] focusing on [specific aspects]. Include: \n\n1) Key trends and their potential impacts on the industry over the next 1-3 years\n\n2) Competitive landscape analysis with market share distribution, if available\n\n3) Major players' strategies, strengths, and weaknesses\n\n4) Consumer behavior patterns and emerging shifts in preferences\n\n5) Market size data with historical growth and future projections\n\n6) Regulatory environment and anticipated changes\n\n7) Technological disruptions affecting the space\n\n8) Distribution channels and their evolution\n\n9) Geographic variations in market conditions\n\n10) Opportunity assessment for new entrants or expansion\n\nConsider [specific factors] and analyze how they particularly impact market dynamics. Provide data-backed insights wherever possible and cite credible sources when referencing statistics or forecasts.",
  },
  {
    id: "academic",
    name: "Academic Research",
    description: "Scholarly analysis and literature review",
    defaultPrompt: "Perform a literature review on [topic] covering research from [time period]. Focus on: \n\n1) Major theoretical frameworks that have shaped understanding of the topic\n\n2) Evolution of key concepts and definitions over time\n\n3) Seminal studies and their core methodologies\n\n4) Contradictory findings and academic debates\n\n5) Methodological approaches commonly used in the field\n\n6) Critiques of dominant research paradigms\n\n7) Interdisciplinary connections and influences\n\n8) Current consensus views versus contested perspectives\n\n9) Emerging subfields or specialized research areas\n\n10) Identified gaps in the literature and directions for future research\n\nAnalyze patterns across studies, synthesize key findings, and evaluate the strength of evidence for major claims in the field. Include citations in an appropriate academic format for key references.",
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
