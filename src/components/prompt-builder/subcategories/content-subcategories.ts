
import { SubCategory } from "../types/subcategory-types";

export const CONTENT_SUBCATEGORIES: SubCategory[] = [
  {
    id: "blog",
    name: "Blog Post",
    description: "Engaging content for your blog",
    defaultPrompt: "Write a comprehensive blog post about [topic] that includes: 1) An attention-grabbing headline that uses power words and creates curiosity, 2) An engaging introduction that hooks the reader with a story, statistic, or question and clearly states the value proposition of the article, 3) Well-structured body content divided into 4-6 key sections covering: [key points], 4) Each section should include real-world examples, supporting evidence from credible sources, and actionable insights, 5) Strategic use of subheadings, bullet points, and short paragraphs for scannability, 6) At least one original framework, checklist, or process the reader can immediately apply, 7) A compelling conclusion that summarizes key takeaways and includes a specific call-to-action. The tone should be conversational yet authoritative, include personal anecdotes where relevant, and the content should be optimized for both reader engagement and SEO value. Target audience is [specific audience demographics, knowledge level, and interests].",
  },
  {
    id: "article",
    name: "Article",
    description: "In-depth informational content",
    defaultPrompt: "Create an informative article about [topic] that explores [key points] in detail. Structure the article with: 1) An informative headline that clearly communicates the main benefit or insight, 2) An executive summary/introduction (150-200 words) providing context and highlighting key findings, 3) A logical progression of sections with descriptive H2 and H3 headings, 4) Research-backed information with properly attributed sources from academic journals, industry reports, or recognized experts, 5) Data visualizations described in detail (charts, graphs, or infographics that would enhance understanding), 6) Expert perspectives with direct quotes where appropriate, 7) Analysis of competing viewpoints or methodologies with fair assessment of strengths and limitations, 8) Practical implications and applications of the information, 9) A conclusion synthesizing the information and identifying emerging trends or future directions. The article should demonstrate subject matter expertise while remaining accessible to [target audience - specify expertise level]. Aim for comprehensive coverage at approximately 1,500-2,000 words, prioritizing accuracy, clarity, and intellectual depth.",
  },
  {
    id: "social",
    name: "Social Media",
    description: "Engaging posts for social platforms",
    defaultPrompt: "Create a set of social media posts about [topic] optimized for engagement across different platforms. Include: 1) LinkedIn: A thought leadership post (1300-1700 characters) with professional insights, data points, and a question to encourage comments. Format with line breaks and emojis for readability. 2) Twitter/X: Three tweet options (260 characters max each) - one question-based, one statistic/fact-based, and one opinion/hot take with appropriate hashtags. 3) Instagram: Caption (800-1000 characters) with a hook, key message, relevant story element, and 8-10 targeted hashtags. Describe an ideal accompanying image. 4) Facebook: Conversational post (250-300 words) designed to spark discussion with a clear question or prompt for comments. 5) TikTok/Reels: Script for a 30-second vertical video with hook, key points, and call-to-action. Include trending sound/music suggestions if relevant. Each post should have attention-grabbing opening lines, concise copy focusing on a single message, relevant hashtags for discoverability, and clear calls-to-action tailored to each platform's audience expectations and algorithm preferences.",
  },
  {
    id: "email",
    name: "Email Content",
    description: "Newsletters, campaigns & outreach",
    defaultPrompt: "Write an email about [topic] with: 1) A compelling subject line (50-60 characters) that creates urgency, curiosity, or clearly states a benefit, 2) A personalized greeting that goes beyond just using the recipient's name, 3) An opening paragraph that immediately establishes relevance to the recipient's specific needs/situation, 4) Clear, scannable body content with bullet points, short paragraphs, and strategic bolding of key points, 5) Specific evidence supporting your value proposition (case studies, testimonials, statistics, or social proof), 6) Addressing 1-2 potential objections preemptively, 7) A clear, single-focused call-to-action with urgency element, 8) A professional signature with relevant contact options, 9) A strategic P.S. line reinforcing the key benefit or adding a final persuasion element. The tone should be conversational yet professional, creating a sense of one-to-one communication rather than mass messaging. Focus on the recipient's needs rather than company-focused messaging, and ensure the value proposition is immediately clear. Target audience is [detailed audience description including role, pain points, and desired outcomes].",
  },
  {
    id: "technical",
    name: "Technical Writing",
    description: "Documentation & technical content",
    defaultPrompt: "Create technical content about [topic] for [audience level: beginner/intermediate/advanced]. Structure the document with: 1) Executive summary outlining the purpose, scope, and key takeaways, 2) Prerequisites section listing required knowledge, tools, systems, and access permissions, 3) Conceptual overview explaining foundational concepts with diagrams/visual descriptions, 4) Step-by-step procedural instructions with command-line examples, expected outputs, and troubleshooting guidance for common errors, 5) Best practices and optimization strategies based on real-world implementation experience, 6) Security considerations and compliance requirements, 7) Limitations and edge cases that users should be aware of, 8) Related resources and next steps for continued learning. Use precise, consistent terminology throughout, clearly distinguish between required and optional steps, include code comments explaining the 'why' behind technical decisions, and format code snippets, configuration files, and command syntax for maximum readability. Examples should progress from simple to complex use cases, and each technical claim should be validated with testing evidence where appropriate.",
  },
  {
    id: "script",
    name: "Video Script",
    description: "Scripts for video content",
    defaultPrompt: "Write a video script about [topic] that's [duration: 2-3/5-7/8-10] minutes long. Structure the script with: 1) A 5-10 second hook that creates curiosity or addresses a pain point, 2) 15-second intro with clear value proposition stating what viewers will learn/gain, 3) Main content sections with timestamps and b-roll/visual suggestions in [brackets], 4) Strategic pattern interrupts every 60-90 seconds (questions, challenges, state changes, or visual cues) to maintain engagement, 5) Natural transitions between sections that maintain narrative flow, 6) On-screen text suggestions for key points, statistics, or complex concepts, 7) Brief mid-roll audience engagement prompt, 8) Conclusion summarizing key points, 9) Specific call-to-action with clear next steps. Write in a conversational, spoken-language style (contractions, simpler sentences) rather than formal written language. Include dialog directions [enthusiastic], [serious], [thoughtful] to guide delivery. Balance educational depth with engagement, and ensure complex concepts are explained through analogies, examples, or visualizations. Target audience is [specific audience description including knowledge level and viewing context].",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Email newsletter content",
    defaultPrompt: "Create a newsletter about [topic] that includes: 1) An attention-grabbing subject line with both curiosity and relevance, 2) A personalized introduction addressing recent developments or seasonality in the industry, 3) Featured main article (300-400 words) covering [key updates] with scannable formatting and a clear takeaway, 4) 2-3 secondary content pieces (100-150 words each) with diverse formats (list, how-to, curated resources, etc.), 5) Industry insights section highlighting 2-3 relevant trends with brief analysis, 6) Spotlight feature (customer success story, team member profile, or product highlight) with humanizing elements, 7) Interactive element (poll, question, social media prompt) to drive engagement, 8) Value-add section (tip, tool recommendation, template, or exclusive resource), 9) Clear segmentation of sections with descriptive subheadings and visual breaks, 10) Forward-looking conclusion with preview of upcoming content. The content should establish thought leadership while maintaining accessibility, balancing educational and promotional content at approximately 80/20 ratio. Assume a consistent visual design with on-brand colors and imagery will be applied. Target audience is [target audience] with specific interest in [audience interests/pain points].",
  }
];
