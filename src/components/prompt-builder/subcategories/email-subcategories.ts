
import { SubCategory } from "../types/subcategory-types";

export const EMAIL_SUBCATEGORIES: SubCategory[] = [
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
];
