import React, { useContext } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Copy } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { AuthContext } from "@/contexts/AuthContext";
interface TemplateItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: "free" | "registered" | "premium";
  prompt: string;
}
const TEMPLATE_DATA: TemplateItem[] = [{
  id: "1",
  title: "Professional Blog Post",
  description: "A comprehensive blog post with research, examples, and actionable insights.",
  category: "Content",
  tier: "registered",
  prompt: "Write a comprehensive blog post about [TOPIC] with the following structure: 1) Introduction that establishes the importance of the topic 2) Background section with key facts and context 3) [3-5] main sections covering different aspects of the topic 4) Each section should include at least one real-world example 5) Actionable takeaways or next steps for the reader 6) Conclusion summarizing main points. Use a professional, authoritative tone but remain accessible to a general audience. Include relevant statistics and cite sources where appropriate. Format with clear headings and subheadings."
}, {
  id: "2",
  title: "JavaScript Web Component",
  description: "Clean, well-commented code for a reusable web component with documentation.",
  category: "Code",
  tier: "premium",
  prompt: "Create a JavaScript web component for [COMPONENT NAME] that [WHAT IT SHOULD DO]. The component should: 1) Follow modern JavaScript best practices and ES6+ syntax 2) Be reusable and customizable through props/attributes 3) Include proper error handling and validation 4) Be optimized for performance. Include comprehensive JSDoc-style comments explaining the purpose, parameters, and return values of each function. Provide usage examples showing different configuration options. The code should work in all modern browsers and gracefully degrade in older browsers."
}, {
  id: "3",
  title: "Product Description",
  description: "Compelling product description that highlights benefits and drives conversions.",
  category: "Marketing",
  tier: "registered",
  prompt: "Write a compelling product description for [PRODUCT NAME], which is a [BRIEF DESCRIPTION]. The target audience is [TARGET DEMOGRAPHIC]. Include: 1) An attention-grabbing headline 2) An opening paragraph that highlights the main value proposition 3) 3-5 bullet points highlighting key features and their benefits to the user 4) A paragraph addressing potential objections or concerns 5) A strong call to action. Use a [TONE] tone and focus on how the product solves problems or improves the customer's life rather than just listing features. Maximum length: 300 words."
}, {
  id: "4",
  title: "SWOT Analysis",
  description: "Detailed SWOT analysis for business strategy with insights and recommendations.",
  category: "Business",
  tier: "premium",
  prompt: "Perform a detailed SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis for [COMPANY/PRODUCT/SERVICE] in the [INDUSTRY] industry. For each SWOT category, identify and explain at least 5 factors. For each factor, provide: 1) A clear explanation of why it's relevant 2) Its potential impact on the business 3) How it relates to current market conditions or trends. After listing all SWOT elements, provide strategic recommendations that: 1) Leverage identified strengths 2) Address critical weaknesses 3) Capitalize on key opportunities 4) Mitigate significant threats. Format the analysis with clear headings and bullet points for readability. Base the analysis on current industry trends and competitive landscape as of [CURRENT YEAR]."
}, {
  id: "5",
  title: "Data Analysis Report",
  description: "Professional report explaining data findings with visualizations and insights.",
  category: "Data",
  tier: "premium",
  prompt: "Create a comprehensive data analysis report based on [DATASET/DESCRIPTION]. The report should include: 1) Executive summary of key findings (150 words max) 2) Introduction explaining the data source, collection methodology, and analysis objectives 3) Data overview section describing variables, data types, and initial observations 4) Exploratory data analysis with descriptive statistics and identification of patterns or anomalies 5) In-depth analysis of [SPECIFIC ASPECT] including statistical tests where appropriate 6) Data visualization recommendations (describe at least 3 types of charts/graphs that would effectively represent the findings) 7) Actionable insights and recommendations based on the analysis 8) Limitations of the current analysis and suggestions for future research. Use a clear, professional tone that would be appropriate for stakeholders with varying levels of technical knowledge."
}, {
  id: "6",
  title: "Social Media Campaign",
  description: "Multi-platform social media campaign with content calendar and engagement strategies.",
  category: "Marketing",
  tier: "premium",
  prompt: "Design a comprehensive social media campaign for [BRAND/PRODUCT] targeting [TARGET AUDIENCE]. The campaign should run for [DURATION] and include content for [PLATFORMS e.g., Instagram, Twitter, Facebook, LinkedIn]. Include: 1) Campaign goals and KPIs 2) Overall theme and messaging strategy 3) Content pillars with at least 3 examples of posts for each platform, including suggested copy, hashtags, and image/video descriptions 4) Posting schedule and frequency recommendations 5) Engagement strategies for each platform 6) Paid promotion recommendations with targeting parameters 7) Collaboration/influencer strategy if applicable 8) Crisis management approach for potential negative feedback. Ensure the campaign aligns with the brand voice described as [BRAND VOICE/TONE] and incorporates current social media trends appropriate for the target audience."
}, {
  id: "7",
  title: "Simple Product Listing",
  description: "Basic e-commerce product listing with key features and benefits.",
  category: "Marketing",
  tier: "free",
  prompt: "Write a product listing for [PRODUCT NAME]. Include a brief description, 3-5 key features, and basic specifications. Use a friendly, informative tone that highlights the main benefits to potential customers."
}];
const Templates = () => {
  const {
    user
  } = useContext(AuthContext);
  const userTier = user?.subscription || "free";
  const canAccessTemplate = (templateTier: string) => {
    if (templateTier === "free") return true;
    if (templateTier === "registered" && (userTier === "registered" || userTier === "premium")) return true;
    if (templateTier === "premium" && userTier === "premium") return true;
    return false;
  };
  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "free":
        return "bg-blue-100 text-blue-800";
      case "registered":
        return "bg-green-100 text-green-800";
      case "premium":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Prompt Library For Every Use Case</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with professionally crafted templates for common use cases.
              {userTier === "free" && " Upgrade to access more templates."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button variant="outline" className="rounded-full">
              All
            </Button>
            <Button variant="outline" className="rounded-full">
              Content
            </Button>
            <Button variant="outline" className="rounded-full">
              Code
            </Button>
            <Button variant="outline" className="rounded-full">
              Marketing
            </Button>
            <Button variant="outline" className="rounded-full">
              Business
            </Button>
            <Button variant="outline" className="rounded-full">
              Data
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATE_DATA.map(template => <Card key={template.id} className={`overflow-hidden border ${!canAccessTemplate(template.tier) ? "opacity-80" : "hover:border-purple-300 hover:shadow-md transition-all"}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className={`${getTierBadgeColor(template.tier)} font-medium`}>
                      {template.tier.charAt(0).toUpperCase() + template.tier.slice(1)}
                    </Badge>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`bg-gray-50 p-3 rounded-md relative ${!canAccessTemplate(template.tier) ? "blur-sm" : ""}`}>
                    <p className="text-xs text-gray-600 line-clamp-4">
                      {template.prompt}
                    </p>
                    {!canAccessTemplate(template.tier) && <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 p-2 rounded-full">
                          <Lock className="h-6 w-6 text-gray-500" />
                        </div>
                      </div>}
                  </div>
                </CardContent>
                <CardFooter>
                  {canAccessTemplate(template.tier) ? <div className="w-full grid grid-cols-2 gap-2">
                      <Button variant="outline" className="w-full flex items-center">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button className="w-full">Use Template</Button>
                    </div> : <Button className="w-full" asChild>
                      <a href="/pricing">Upgrade to Access</a>
                    </Button>}
                </CardFooter>
              </Card>)}
          </div>
        </div>
      </div>
    </div>;
};
export default Templates;