export interface FieldConfig {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "tags";
  required: boolean;
  optional?: boolean;
  tooltip?: string;
  options?: string[];
}

export interface UseCase {
  id: string;
  name: string;
  fields: FieldConfig[];
  promptTemplate: string;
}

export const USE_CASES: UseCase[] = [
  {
    id: "content-creation",
    name: "Content Creation",
    fields: [
      { id: "topic", label: "Topic", type: "text", required: true },
      { id: "targetAudience", label: "Target Audience", type: "text", required: true },
      { id: "tone", label: "Tone", type: "select", required: true, options: ["professional", "casual", "friendly", "formal"] },
      { id: "wordCount", label: "Word Count", type: "number", required: false },
      { id: "keyPoints", label: "Key Points", type: "textarea", required: false }
    ],
    promptTemplate: "Create content about {topic} for {targetAudience} with a {tone} tone. Include these key points: {keyPoints}. Target length: {wordCount} words."
  },
  {
    id: "code-generation",
    name: "Code Generation", 
    fields: [
      { id: "language", label: "Programming Language", type: "text", required: true },
      { id: "functionality", label: "Functionality", type: "textarea", required: true },
      { id: "framework", label: "Framework", type: "text", required: false },
      { id: "complexity", label: "Complexity Level", type: "select", required: false, options: ["simple", "intermediate", "advanced"] }
    ],
    promptTemplate: "Write {language} code for {functionality}. Use {framework} framework if specified. Complexity level: {complexity}."
  },
  {
    id: "email-writing",
    name: "Email Writing",
    fields: [
      { id: "purpose", label: "Email Purpose", type: "text", required: true },
      { id: "recipient", label: "Recipient", type: "text", required: true },
      { id: "tone", label: "Tone", type: "select", required: true, options: ["professional", "friendly", "formal", "casual"] },
      { id: "callToAction", label: "Call To Action", type: "text", required: false }
    ],
    promptTemplate: "Write an email for {purpose} to {recipient} with a {tone} tone. Include this call to action: {callToAction}."
  },
  {
    id: "research-analysis",
    name: "Research Analysis",
    fields: [
      { id: "researchTopic", label: "Research Topic", type: "text", required: true },
      { id: "researchDepth", label: "Research Depth", type: "select", required: true, options: ["surface", "moderate", "deep"] },
      { id: "sources", label: "Preferred Sources", type: "textarea", required: false },
      { id: "targetAudience", label: "Target Audience", type: "text", required: false }
    ],
    promptTemplate: "Conduct {researchDepth} research on {researchTopic}. Use these sources: {sources}. Present findings for {targetAudience}."
  },
  {
    id: "seo-optimization",
    name: "SEO Optimization",
    fields: [
      { id: "keywords", label: "Keywords", type: "tags", required: true },
      { id: "contentType", label: "Content Type", type: "select", required: true, options: ["blog post", "product page", "landing page", "category page"] },
      { id: "targetAudience", label: "Target Audience", type: "text", required: true },
      { id: "businessType", label: "Business Type", type: "text", required: false }
    ],
    promptTemplate: "Create SEO-optimized {contentType} targeting keywords {keywords} for {targetAudience}. Business context: {businessType}."
  },
  {
    id: "persona-generator",
    name: "Persona Generator",
    fields: [
      { id: "industry", label: "Industry", type: "text", required: true },
      { id: "targetMarket", label: "Target Market", type: "text", required: true },
      { id: "productType", label: "Product Type", type: "text", required: true },
      { id: "demographics", label: "Demographics", type: "textarea", required: true },
      { id: "painPoints", label: "Pain Points", type: "textarea", required: true }
    ],
    promptTemplate: "Generate detailed customer personas for {industry} targeting {targetMarket} for {productType}. Include demographics: {demographics} and address pain points: {painPoints}."
  }
];