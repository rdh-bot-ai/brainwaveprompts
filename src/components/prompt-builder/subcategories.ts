import { TaskType } from "./TaskIcons";

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  defaultPrompt: string;
}

export type SubCategoriesMap = {
  [key in TaskType]: SubCategory[];
};

export const SUBCATEGORIES: SubCategoriesMap = {
  email: [
    {
      id: "business",
      name: "Business Communication",
      description: "Professional business emails",
      defaultPrompt: "Write a professional email for [purpose] that [objective]. The tone should be [tone] and include [key points]. The email should be appropriate for [audience] and maintain [company] standards.",
    },
    {
      id: "customer",
      name: "Customer Service",
      description: "Customer support responses",
      defaultPrompt: "Compose a customer service email response addressing [issue]. Use a [tone] tone while showing empathy and providing clear solutions. Include [specific details] and end with [call to action].",
    },
    {
      id: "marketing",
      name: "Marketing Emails",
      description: "Promotional and campaign emails",
      defaultPrompt: "Create a marketing email for [product/service] targeting [audience]. Include compelling subject line, clear value proposition about [benefits], and strong call-to-action for [desired action].",
    },
    {
      id: "influencer",
      name: "Influencer Outreach",
      description: "Collaboration and partnership emails",
      defaultPrompt: "Write an outreach email to [influencer type] for [collaboration type]. Highlight [unique value proposition], demonstrate familiarity with their work, and propose [specific collaboration details].",
    },
    {
      id: "corporate",
      name: "Corporate Communications",
      description: "Internal and stakeholder emails",
      defaultPrompt: "Draft a corporate communication about [topic] for [stakeholder group]. Include [key updates/changes], address potential concerns about [issues], and outline [next steps/expectations].",
    },
    {
      id: "sales",
      name: "Sales Outreach",
      description: "Sales and prospecting emails",
      defaultPrompt: "Write a sales outreach email for [target audience] about [product/service]. Include a compelling value proposition, address pain points, and end with a clear [call to action].",
    },
    {
      id: "follow",
      name: "Follow-up Emails",
      description: "Post-meeting or event follow-ups",
      defaultPrompt: "Create a follow-up email regarding [topic/event]. Reference key points from [previous interaction], and include next steps for [objective].",
    },
    {
      id: "networking",
      name: "Professional Networking",
      description: "Network building and connections",
      defaultPrompt: "Write a networking email to [contact] regarding [purpose]. Mention [common connection/interest] and suggest [specific action/meeting].",
    }
  ],
  content: [
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
  ],
  code: [
    {
      id: "function",
      name: "Function/Method",
      description: "Individual code functions",
      defaultPrompt: "Write a [language] function that [functionality]. Include proper error handling, parameter validation, and thorough comments explaining the approach and usage examples.",
    },
    {
      id: "component",
      name: "UI Component",
      description: "Frontend interface elements",
      defaultPrompt: "Create a reusable [language] UI component for [functionality]. Include props/parameters for customization, styling options, and handle common edge cases. Document usage with examples.",
    },
    {
      id: "algorithm",
      name: "Algorithm",
      description: "Efficient problem-solving code",
      defaultPrompt: "Implement an efficient algorithm in [language] to solve the following problem: [functionality]. Analyze the time and space complexity, and explain your approach with detailed comments.",
    },
    {
      id: "api",
      name: "API Integration",
      description: "Code to connect with external services",
      defaultPrompt: "Write [language] code to integrate with [specific API/service] to accomplish [functionality]. Include authentication handling, error management, and example usage scenarios.",
    },
    {
      id: "testing",
      name: "Test Cases",
      description: "Unit & integration tests",
      defaultPrompt: "Write [language] test cases for [functionality]. Include unit tests for edge cases, integration scenarios, and proper test documentation.",
    },
    {
      id: "refactor",
      name: "Code Refactoring",
      description: "Improve existing code",
      defaultPrompt: "Refactor this [language] code: [paste code]. Improve readability, maintainability, and performance while maintaining the same functionality.",
    },
    {
      id: "database",
      name: "Database Queries",
      description: "SQL and database operations",
      defaultPrompt: "Write a [database type] query to [operation] that handles [requirements]. Include proper indexing and optimization considerations.",
    }
  ],
  idea: [
    {
      id: "business",
      name: "Business Ideas",
      description: "Entrepreneurial concepts",
      defaultPrompt: "Help me brainstorm innovative business ideas related to [challenge]. Consider market gaps, current trends in [context], and viable solutions that could be developed with [constraints] in mind.",
    },
    {
      id: "product",
      name: "Product Concepts",
      description: "New product development ideas",
      defaultPrompt: "Generate product ideas that solve [challenge]. Focus on user needs, market differentiation, and feasibility given [constraints]. Include potential features, target audience, and unique selling points.",
    },
    {
      id: "solution",
      name: "Problem Solutions",
      description: "Approaches to solve challenges",
      defaultPrompt: "Brainstorm solutions for this problem: [challenge]. Consider different approaches, methodologies, and frameworks that could address this issue within [context] and [constraints].",
    },
    {
      id: "creative",
      name: "Creative Concepts",
      description: "Artistic and creative ideas",
      defaultPrompt: "Generate creative concepts for [challenge] that are innovative and original. Explore different artistic directions, themes, and executions that could resonate with [context].",
    },
    {
      id: "marketing",
      name: "Marketing Campaigns",
      description: "Marketing strategy ideas",
      defaultPrompt: "Generate marketing campaign ideas for [product/service] targeting [audience]. Consider [budget/constraints] and focus on [objectives].",
    },
    {
      id: "content-strategy",
      name: "Content Strategy",
      description: "Content planning ideas",
      defaultPrompt: "Develop content strategy ideas for [platform/channel] to reach [target audience]. Include content themes, formats, and distribution approaches.",
    },
    {
      id: "innovation",
      name: "Product Innovation",
      description: "New product/feature ideas",
      defaultPrompt: "Generate innovative product ideas that solve [problem] for [target market]. Consider [industry trends] and [technological capabilities].",
    }
  ],
  image: [
    {
      id: "illustration",
      name: "Illustration",
      description: "Descriptive drawing prompts",
      defaultPrompt: "Create a detailed prompt for an AI illustration of [subject], featuring [details]. The style should be [style], with [colors] color palette. Include specific details about lighting, perspective, and mood.",
    },
    {
      id: "photograph",
      name: "Photography",
      description: "Realistic photo prompts",
      defaultPrompt: "Generate a prompt for a photorealistic image of [subject] with [details]. Specify camera settings like [settings], lighting conditions such as [lighting], and composition details like [composition].",
    },
    {
      id: "3d",
      name: "3D Rendering",
      description: "Three-dimensional visual prompts",
      defaultPrompt: "Create a detailed prompt for a 3D rendering of [subject]. Include specifications for materials, textures, lighting setup, camera angle, and environment details. The style should be [style].",
    },
    {
      id: "concept",
      name: "Concept Art",
      description: "Visuals for products or media",
      defaultPrompt: "Generate a prompt for concept art of [subject] for [purpose]. Include details about the aesthetic, mood, key visual elements, color scheme, and stylistic references to inform the creation.",
    },
    {
      id: "product",
      name: "Product Photography",
      description: "Product showcase images",
      defaultPrompt: "Create a product photography prompt for [product] that highlights [key features]. Include lighting setup, composition, and styling details.",
    },
    {
      id: "character",
      name: "Character Design",
      description: "Character concept art",
      defaultPrompt: "Generate a character design prompt for [character type]. Include details about personality, appearance, poses, and artistic style.",
    },
    {
      id: "environment",
      name: "Environment Design",
      description: "Scene and location visuals",
      defaultPrompt: "Create an environment design prompt for [location/scene]. Specify atmosphere, lighting, key elements, and architectural/natural details.",
    }
  ],
  research: [
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
  ],
  data: [
    {
      id: "interpret",
      name: "Data Interpretation",
      description: "Finding meaning in data sets",
      defaultPrompt: "Analyze the following data about [topic/dataset] and provide meaningful interpretations. Identify patterns, outliers, correlations, and potential causations. Explain the significance of key findings for [audience/purpose].",
    },
    {
      id: "visualize",
      name: "Visualization Planning",
      description: "Planning effective data displays",
      defaultPrompt: "Recommend appropriate visualization approaches for data about [topic/dataset]. Suggest specific chart types, key variables to highlight, color schemes, and annotations that would effectively communicate the insights.",
    },
    {
      id: "metrics",
      name: "KPI & Metrics",
      description: "Key performance indicators",
      defaultPrompt: "Develop a framework of key metrics and KPIs to track [objective/goal]. Include definitions, calculation methods, benchmarks, and explain how each metric relates to overall business/organizational goals.",
    },
    {
      id: "forecast",
      name: "Predictions & Forecasting",
      description: "Future data projections",
      defaultPrompt: "Based on the provided data about [topic], generate forecasts and predictions for [timeframe]. Explain the methodology, assumptions, confidence levels, and key factors that could influence these projections.",
    },
    {
      id: "predictive",
      name: "Predictive Analysis",
      description: "Future trends prediction",
      defaultPrompt: "Develop predictive analysis for [metric/trend] based on [historical data]. Include key variables, assumptions, and confidence levels.",
    },
    {
      id: "segmentation",
      name: "Market Segmentation",
      description: "Customer grouping analysis",
      defaultPrompt: "Create market segmentation analysis for [customer base]. Identify key segments, characteristics, and targeting opportunities.",
    },
    {
      id: "conversion",
      name: "Conversion Analysis",
      description: "Sales funnel optimization",
      defaultPrompt: "Analyze conversion data for [process/funnel]. Identify bottlenecks, optimization opportunities, and success metrics.",
    }
  ],
  seo: [
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
  ],
  knowledge: [
    {
      id: "guide",
      name: "How-to Guide",
      description: "Step-by-step instructions",
      defaultPrompt: "Create a comprehensive how-to guide for [process/task]. Include step-by-step instructions, prerequisites, required tools/materials, troubleshooting tips, and visual description suggestions where applicable.",
    },
    {
      id: "faq",
      name: "FAQ Content",
      description: "Common questions and answers",
      defaultPrompt: "Generate a thorough FAQ section about [topic]. Include at least 10 common questions with clear, concise answers. Structure the content to be both user-friendly and optimized for featured snippets.",
    },
    {
      id: "glossary",
      name: "Glossary & Definitions",
      description: "Term explanations",
      defaultPrompt: "Create a glossary of [number] key terms related to [topic/industry]. For each term, provide a concise definition, contextual explanation, and where relevant, examples of usage.",
    },
    {
      id: "documentation",
      name: "Technical Documentation",
      description: "Detailed technical explanations",
      defaultPrompt: "Write technical documentation for [product/feature/system]. Include purpose, specifications, setup instructions, usage examples, API details if applicable, and common troubleshooting scenarios.",
    },
    {
      id: "training",
      name: "Training Materials",
      description: "Educational content",
      defaultPrompt: "Create training materials for [topic/skill]. Include learning objectives, key concepts, exercises, and assessment criteria.",
    },
    {
      id: "procedures",
      name: "Standard Procedures",
      description: "Process documentation",
      defaultPrompt: "Document standard operating procedures for [process]. Include step-by-step instructions, requirements, and troubleshooting guides.",
    },
    {
      id: "reference",
      name: "Quick Reference",
      description: "Quick guides and cheatsheets",
      defaultPrompt: "Create a quick reference guide for [topic/tool]. Include essential commands, common use cases, and best practices.",
    }
  ],
  other: [
    {
      id: "custom",
      name: "Custom Prompt",
      description: "Build your own prompt",
      defaultPrompt: "I need help with [describe your task]. Please provide [specific output] that includes [key elements]. The tone should be [preferred tone], and the detail level should be [basic/moderate/detailed].",
    },
    {
      id: "workflow",
      name: "Workflow Design",
      description: "Process and system planning",
      defaultPrompt: "Help me design a workflow for [process/task]. Break down the process into clear stages, identify key stakeholders, list required resources, note decision points, and suggest efficiency improvements.",
    },
    {
      id: "speech",
      name: "Speech/Presentation",
      description: "Public speaking content",
      defaultPrompt: "Create a [length] speech/presentation about [topic] for [audience]. Include an attention-grabbing opening, clear structure with key points, compelling examples/stories, and a memorable conclusion.",
    },
    {
      id: "critique",
      name: "Review & Critique",
      description: "Analysis and feedback",
      defaultPrompt: "Provide a constructive critique of this [content/work/idea]: [paste content or describe]. Analyze strengths, areas for improvement, consider [specific aspects], and suggest specific, actionable improvements.",
    },
  ],
};

export const getDefaultPrompt = (taskType: TaskType, subCategoryId: string): string => {
  const subcategory = SUBCATEGORIES[taskType]?.find(sub => sub.id === subCategoryId);
  return subcategory?.defaultPrompt || "";
};
