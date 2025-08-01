export interface FieldConfig {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "tags" | "file";
  required: boolean;
  optional?: boolean;
  tooltip?: string;
  options?: string[];
  accept?: string; // For file inputs
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
  },
  {
    id: "blog-post-sme",
    name: "Blog Post – SME-level",
    fields: [
      { id: "topic", label: "Topic", type: "text", required: true },
      { id: "targetAudience", label: "Target Audience", type: "text", required: true },
      { id: "tone", label: "Tone", type: "select", required: true, options: ["professional", "casual", "friendly", "formal"] },
      { id: "keyPoints", label: "Key Points", type: "textarea", required: true },
      { id: "wordCount", label: "Word Count", type: "number", required: false },
      { id: "cta", label: "Call to Action", type: "text", required: true }
    ],
    promptTemplate: "Write an expert-level blog post about {topic} for {targetAudience} with a {tone} tone. Cover these key points: {keyPoints}. Target length: {wordCount} words. Include this call to action: {cta}."
  },
  {
    id: "cold-email-b2b",
    name: "Cold Email – B2B",
    fields: [
      { id: "recipient", label: "Recipient", type: "text", required: true },
      { id: "company", label: "Company", type: "text", required: true },
      { id: "purpose", label: "Email Purpose", type: "text", required: true },
      { id: "tone", label: "Tone", type: "select", required: true, options: ["professional", "friendly", "formal"] },
      { id: "offer", label: "Offer", type: "text", required: true }
    ],
    promptTemplate: "Write a B2B cold email to {recipient} at {company} for {purpose} with a {tone} tone. Present this offer: {offer}."
  },
  {
    id: "seo-keyword-cluster",
    name: "SEO Keyword Cluster",
    fields: [
      { id: "keywords", label: "Keywords", type: "tags", required: true },
      { id: "contentType", label: "Content Type", type: "select", required: true, options: ["blog post", "product page", "landing page", "category page"] },
      { id: "targetAudience", label: "Target Audience", type: "text", required: true },
      { id: "searchIntent", label: "Search Intent", type: "select", required: true, options: ["informational", "commercial", "transactional", "navigational"] }
    ],
    promptTemplate: "Create SEO content clusters for keywords: {keywords}. Generate {contentType} optimized for {searchIntent} intent, targeting {targetAudience}. For each keyword, provide: title suggestions, content outline, and related long-tail variations."
  },
  {
    id: "summarize-pdf",
    name: "Summarize PDF",
    fields: [
      { id: "pdfFile", label: "PDF File (max 5 MB)", type: "file", required: true, accept: ".pdf", tooltip: "Upload a PDF file (max 5MB)" },
      { id: "documentType", label: "Document Type", type: "text", required: true },
      { id: "targetAudience", label: "Target Audience", type: "text", required: true },
      { id: "summaryLength", label: "Summary Length", type: "select", required: true, options: ["brief", "detailed", "comprehensive"] },
      { id: "keyFocus", label: "Key Focus Areas", type: "textarea", required: false }
    ],
    promptTemplate: "Summarize this {documentType} for {targetAudience} in {summaryLength} format. Focus on: {keyFocus}. Document content: {documentSummary}"
  }
];