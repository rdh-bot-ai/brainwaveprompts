import { SubCategory } from "../types/subcategory-types";

export const CONTENT_SUBCATEGORIES: SubCategory[] = [
  {
    id: "blog",
    name: "Blog Post",
    description: "Engaging content for your blog",
    defaultPrompt: "Write a comprehensive [word count] blog post about [topic] that includes: \n\n1) An attention-grabbing headline that uses power words and creates curiosity\n\n2) An engaging introduction that hooks the reader with a story, statistic, or question and clearly states the value proposition of the article\n\n3) Well-structured body content divided into 4-6 key sections covering: [key points]\n\n4) Each section should include real-world examples, supporting evidence from credible sources, and actionable insights\n\n5) Strategic use of subheadings, bullet points, and short paragraphs for scannability\n\n6) At least one original framework, checklist, or process the reader can immediately apply\n\n7) A compelling conclusion that summarizes key takeaways and includes a specific call-to-action\n\nThe tone should be [tone] and the content should be optimized for both reader engagement and SEO value. Target audience is [target audience].",
  },
  {
    id: "article",
    name: "Article",
    description: "In-depth informational content",
    defaultPrompt: "Create an informative article about [topic] that explores [key points] in detail with [research depth] research level. Structure the article with: \n\n1) An informative headline that clearly communicates the main benefit or insight\n\n2) An executive summary/introduction (150-200 words) providing context and highlighting key findings\n\n3) A logical progression of sections with descriptive H2 and H3 headings\n\n4) Research-backed information with properly attributed sources from [sources]\n\n5) Data visualizations described in detail (charts, graphs, or infographics that would enhance understanding)\n\n6) Expert perspectives with direct quotes where appropriate\n\n7) Analysis of competing viewpoints or methodologies with fair assessment of strengths and limitations\n\n8) Practical implications and applications of the information\n\n9) A conclusion synthesizing the information and identifying emerging trends or future directions\n\nThe article should demonstrate subject matter expertise while remaining accessible to [target audience]. Aim for comprehensive coverage prioritizing accuracy, clarity, and intellectual depth.",
  },
  {
    id: "social",
    name: "Social Media",
    description: "Engaging posts for social platforms",
    defaultPrompt: "Create a set of social media posts about [topic] covering [key points] optimized for [platforms] with [engagement goal]. Include: \n\n1) LinkedIn: A thought leadership post (1300-1700 characters) with professional insights, data points, and a question to encourage comments. Format with line breaks and emojis for readability.\n\n2) Twitter/X: Three tweet options (260 characters max each) - one question-based, one statistic/fact-based, and one opinion/hot take with appropriate hashtags.\n\n3) Instagram: Caption (800-1000 characters) with a hook, key message, relevant story element, and 8-10 targeted hashtags. Describe an ideal accompanying image.\n\n4) Facebook: Conversational post (250-300 words) designed to spark discussion with a clear question or prompt for comments.\n\n5) TikTok/Reels: Script for a 30-second vertical video with hook, key points, and call-to-action. Include trending sound/music suggestions if relevant.\n\nEach post should have attention-grabbing opening lines, concise copy focusing on a single message, relevant hashtags for discoverability, and clear calls-to-action tailored to each platform's audience expectations. Target audience is [target audience].",
  },
  {
    id: "email",
    name: "Email Content",
    description: "Newsletters, campaigns & outreach",
    defaultPrompt: "Write a [email type] email about [topic] covering [key points] with [cta] as the primary call-to-action: \n\n1) A compelling subject line (50-60 characters) that creates urgency, curiosity, or clearly states a benefit\n\n2) A personalized greeting that goes beyond just using the recipient's name\n\n3) An opening paragraph that immediately establishes relevance to the recipient's specific needs/situation\n\n4) Clear, scannable body content with bullet points, short paragraphs, and strategic bolding of key points\n\n5) Specific evidence supporting your value proposition (case studies, testimonials, statistics, or social proof)\n\n6) Addressing 1-2 potential objections preemptively\n\n7) A clear, single-focused call-to-action: [cta]\n\n8) A professional signature with relevant contact options\n\n9) A strategic P.S. line reinforcing the key benefit or adding a final persuasion element\n\nThe tone should be [tone] and create a sense of one-to-one communication rather than mass messaging. Focus on the recipient's needs and ensure the value proposition is immediately clear. Target audience is [target audience].",
  },
  {
    id: "technical",
    name: "Technical Writing",
    description: "Documentation & technical content",
    defaultPrompt: "Create technical content about [topic] covering [key points] for [audience level] audience. Prerequisites: [prerequisites]. Structure the document with: \n\n1) Executive summary outlining the purpose, scope, and key takeaways\n\n2) Prerequisites section listing: [prerequisites]\n\n3) Conceptual overview explaining foundational concepts with diagrams/visual descriptions\n\n4) Step-by-step procedural instructions with command-line examples, expected outputs, and troubleshooting guidance for common errors\n\n5) Best practices and optimization strategies based on real-world implementation experience\n\n6) Security considerations and compliance requirements\n\n7) Limitations and edge cases that users should be aware of\n\n8) Related resources and next steps for continued learning\n\nUse precise, consistent terminology throughout, clearly distinguish between required and optional steps, include code comments explaining the 'why' behind technical decisions, and format code snippets for maximum readability. Target audience is [target audience] with [audience level] technical expertise.",
  },
  {
    id: "script",
    name: "Video Script",
    description: "Scripts for video content",
    defaultPrompt: "Write a [duration] video script about [topic] covering [key points] optimized for [platform]. Structure the script with: \n\n1) A 5-10 second hook that creates curiosity or addresses a pain point\n\n2) 15-second intro with clear value proposition stating what viewers will learn/gain\n\n3) Main content sections with timestamps and b-roll/visual suggestions in [brackets]\n\n4) Strategic pattern interrupts every 60-90 seconds (questions, challenges, state changes, or visual cues) to maintain engagement\n\n5) Natural transitions between sections that maintain narrative flow\n\n6) On-screen text suggestions for key points, statistics, or complex concepts\n\n7) Brief mid-roll audience engagement prompt\n\n8) Conclusion summarizing key points\n\n9) Specific call-to-action with clear next steps\n\nWrite in a conversational, spoken-language style (contractions, simpler sentences) rather than formal written language. Include dialog directions [enthusiastic], [serious], [thoughtful] to guide delivery. Balance educational depth with engagement, and ensure complex concepts are explained through analogies, examples, or visualizations. Target audience is [target audience] viewing on [platform].",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Email newsletter content",
    defaultPrompt: "Create a [frequency] newsletter about [topic] covering [key points] with sections: [sections]. Include: \n\n1) An attention-grabbing subject line with both curiosity and relevance\n\n2) A personalized introduction addressing recent developments or seasonality in the industry\n\n3) Featured main article (300-400 words) covering the main topic with scannable formatting and a clear takeaway\n\n4) Newsletter sections as specified: [sections]\n\n5) Industry insights section highlighting 2-3 relevant trends with brief analysis\n\n6) Spotlight feature (customer success story, team member profile, or product highlight) with humanizing elements\n\n7) Interactive element (poll, question, social media prompt) to drive engagement\n\n8) Value-add section (tip, tool recommendation, template, or exclusive resource)\n\n9) Clear segmentation of sections with descriptive subheadings and visual breaks\n\n10) Forward-looking conclusion with preview of upcoming content\n\nThe content should establish thought leadership while maintaining accessibility, balancing educational and promotional content at approximately 80/20 ratio. Target audience is [target audience].",
  }
];
