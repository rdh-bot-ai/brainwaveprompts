
import React, { useContext, useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import { AuthContext } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import TemplatesSidebar from "@/components/templates/TemplatesSidebar";
import TemplateCard from "@/components/templates/TemplateCard";
import { TemplateItem, TemplateCategory } from "@/types/template-types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Template data
const TEMPLATE_DATA: TemplateItem[] = [
  {
    id: "1",
    title: "Professional Blog Post",
    description: "A comprehensive blog post with research, examples, and actionable insights.",
    category: "Content",
    tier: "registered",
    prompt: "Write a comprehensive blog post about [TOPIC] with the following structure: 1) Introduction that establishes the importance of the topic 2) Background section with key facts and context 3) [3-5] main sections covering different aspects of the topic 4) Each section should include at least one real-world example 5) Actionable takeaways or next steps for the reader 6) Conclusion summarizing main points. Use a professional, authoritative tone but remain accessible to a general audience. Include relevant statistics and cite sources where appropriate. Format with clear headings and subheadings."
  },
  {
    id: "2",
    title: "JavaScript Web Component",
    description: "Clean, well-commented code for a reusable web component with documentation.",
    category: "Code",
    tier: "premium",
    prompt: "Create a JavaScript web component for [COMPONENT NAME] that [WHAT IT SHOULD DO]. The component should: 1) Follow modern JavaScript best practices and ES6+ syntax 2) Be reusable and customizable through props/attributes 3) Include proper error handling and validation 4) Be optimized for performance. Include comprehensive JSDoc-style comments explaining the purpose, parameters, and return values of each function. Provide usage examples showing different configuration options. The code should work in all modern browsers and gracefully degrade in older browsers."
  },
  {
    id: "3",
    title: "Product Description",
    description: "Compelling product description that highlights benefits and drives conversions.",
    category: "Marketing",
    tier: "registered",
    prompt: "Write a compelling product description for [PRODUCT NAME], which is a [BRIEF DESCRIPTION]. The target audience is [TARGET DEMOGRAPHIC]. Include: 1) An attention-grabbing headline 2) An opening paragraph that highlights the main value proposition 3) 3-5 bullet points highlighting key features and their benefits to the user 4) A paragraph addressing potential objections or concerns 5) A strong call to action. Use a [TONE] tone and focus on how the product solves problems or improves the customer's life rather than just listing features. Maximum length: 300 words."
  },
  {
    id: "4",
    title: "SWOT Analysis",
    description: "Detailed SWOT analysis for business strategy with insights and recommendations.",
    category: "Business",
    tier: "premium",
    prompt: "Perform a detailed SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis for [COMPANY/PRODUCT/SERVICE] in the [INDUSTRY] industry. For each SWOT category, identify and explain at least 5 factors. For each factor, provide: 1) A clear explanation of why it's relevant 2) Its potential impact on the business 3) How it relates to current market conditions or trends. After listing all SWOT elements, provide strategic recommendations that: 1) Leverage identified strengths 2) Address critical weaknesses 3) Capitalize on key opportunities 4) Mitigate significant threats. Format the analysis with clear headings and bullet points for readability. Base the analysis on current industry trends and competitive landscape as of [CURRENT YEAR]."
  },
  {
    id: "5",
    title: "Data Analysis Report",
    description: "Professional report explaining data findings with visualizations and insights.",
    category: "Data",
    tier: "premium",
    prompt: "Create a comprehensive data analysis report based on [DATASET/DESCRIPTION]. The report should include: 1) Executive summary of key findings (150 words max) 2) Introduction explaining the data source, collection methodology, and analysis objectives 3) Data overview section describing variables, data types, and initial observations 4) Exploratory data analysis with descriptive statistics and identification of patterns or anomalies 5) In-depth analysis of [SPECIFIC ASPECT] including statistical tests where appropriate 6) Data visualization recommendations (describe at least 3 types of charts/graphs that would effectively represent the findings) 7) Actionable insights and recommendations based on the analysis 8) Limitations of the current analysis and suggestions for future research. Use a clear, professional tone that would be appropriate for stakeholders with varying levels of technical knowledge."
  },
  {
    id: "6",
    title: "Social Media Campaign",
    description: "Multi-platform social media campaign with content calendar and engagement strategies.",
    category: "Marketing",
    tier: "premium",
    prompt: "Design a comprehensive social media campaign for [BRAND/PRODUCT] targeting [TARGET AUDIENCE]. The campaign should run for [DURATION] and include content for [PLATFORMS e.g., Instagram, Twitter, Facebook, LinkedIn]. Include: 1) Campaign goals and KPIs 2) Overall theme and messaging strategy 3) Content pillars with at least 3 examples of posts for each platform, including suggested copy, hashtags, and image/video descriptions 4) Posting schedule and frequency recommendations 5) Engagement strategies for each platform 6) Paid promotion recommendations with targeting parameters 7) Collaboration/influencer strategy if applicable 8) Crisis management approach for potential negative feedback. Ensure the campaign aligns with the brand voice described as [BRAND VOICE/TONE] and incorporates current social media trends appropriate for the target audience."
  },
  {
    id: "7",
    title: "Simple Product Listing",
    description: "Basic e-commerce product listing with key features and benefits.",
    category: "Marketing",
    tier: "free",
    prompt: "Write a product listing for [PRODUCT NAME]. Include a brief description, 3-5 key features, and basic specifications. Use a friendly, informative tone that highlights the main benefits to potential customers."
  }
];

// Categories
const CATEGORIES: TemplateCategory[] = [
  { id: "all", name: "All Templates" },
  { id: "Content", name: "Content" },
  { id: "Code", name: "Code" },
  { id: "Marketing", name: "Marketing" },
  { id: "Business", name: "Business" },
  { id: "Data", name: "Data" }
];

const Templates = () => {
  const { user } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    return TEMPLATE_DATA.filter(template => {
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
      const matchesSearch = 
        searchQuery === "" || 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.prompt.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-0 py-6">
        <SidebarProvider defaultOpen>
          <div className="flex min-h-[calc(100vh-theme(spacing.20))] w-full rounded-lg border bg-card shadow">
            <TemplatesSidebar
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            
            <div className="flex-1 p-6">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Templates</h1>
                  <p className="text-muted-foreground">
                    Start with professionally crafted templates for common use cases.
                    {user?.subscription === "free" && " Upgrade to access more templates."}
                  </p>
                  
                  <div className="mt-6 max-w-md mx-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search templates..."
                        className="pl-10 pr-4 py-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {filteredTemplates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map(template => (
                      <TemplateCard key={template.id} template={template} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-lg text-gray-500">No templates found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Templates;
