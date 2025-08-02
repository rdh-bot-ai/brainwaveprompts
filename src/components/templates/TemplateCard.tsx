
import React, { useContext } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clipboard, Copy, Lock, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuthContext } from "@/contexts/AuthContext";
import { TemplateItem } from "@/types/template-types";
import { useNavigate } from "react-router-dom";
import { canAccessTemplate } from "@/config/planMatrix";

interface TemplateCardProps {
  template: TemplateItem;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const userCanAccessTemplate = () => {
    if (!user) return template.tier === "free";
    return canAccessTemplate(user.plan, template.tier);
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

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(template.prompt);
    toast({
      title: "Copied to clipboard",
      description: "The template prompt has been copied to your clipboard.",
    });
  };

  const handleOpenInBuilder = () => {
    // Clear any existing template data first
    sessionStorage.removeItem("templatePrompt");
    sessionStorage.removeItem("openInAdvancedEditor");
    sessionStorage.removeItem("templateTitle");
    sessionStorage.removeItem("templateCategory");
    sessionStorage.removeItem("templateDescription");
    
    // Now store the template data in sessionStorage to use it in the builder
    sessionStorage.setItem("templatePrompt", template.prompt);
    sessionStorage.setItem("openInAdvancedEditor", "true"); // Flag to open in advanced editor
    sessionStorage.setItem("templateTitle", template.title);
    sessionStorage.setItem("templateCategory", template.category);
    sessionStorage.setItem("templateDescription", template.description);
    
    // Development logging only
    if (process.env.NODE_ENV === 'development') {
      console.log("Storing template data for builder:", {
        prompt: template.prompt,
        title: template.title,
        category: template.category,
        description: template.description
      });
    }
    
    // Navigate to the builder page
    navigate("/builder");
  };

  return (
    <Card className={`overflow-hidden border ${!userCanAccessTemplate() ? "opacity-80" : "hover:border-purple-300 hover:shadow-md transition-all"}`}>
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
        <div className={`bg-gray-50 p-3 rounded-md relative ${!userCanAccessTemplate() ? "blur-sm" : ""}`}>
          <p className="text-xs text-gray-600 line-clamp-4">
            {template.prompt}
          </p>
          {!userCanAccessTemplate() && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 p-2 rounded-full">
                <Lock className="h-6 w-6 text-gray-500" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {userCanAccessTemplate() ? (
          <div className="w-full grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full flex items-center" onClick={handleCopyPrompt}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button className="w-full flex items-center gap-1" onClick={handleOpenInBuilder}>
              <ExternalLink className="h-4 w-4" />
              Edit
            </Button>
          </div>
        ) : (
          <Button className="w-full" asChild>
            <a href="/pricing">Upgrade to Access</a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
