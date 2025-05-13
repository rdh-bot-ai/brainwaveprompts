
export interface TemplateCategory {
  id: string;
  name: string;
}

export interface TemplateItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: "free" | "registered" | "premium";
  prompt: string;
}
