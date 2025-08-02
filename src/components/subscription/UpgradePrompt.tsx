
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface UpgradePromptProps {
  currentTier: "free" | "registered" | "premium";
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({ currentTier }) => {
  if (currentTier === "premium") {
    return null;
  }

  const nextTier = currentTier === "free" ? "registered" : "premium";
  const tierInfo = {
    registered: {
      name: "Registered",
      benefit: "5 AI prompts/month with GPT-3.5 + extended templates",
      cta: "Upgrade for Free",
      price: "Free",
    },
    premium: {
      name: "Premium",
      benefit: "Unlimited GPT-4 Turbo prompts + advanced AI features",
      cta: "Upgrade to Premium",
      price: "$18/month",
    },
  };

  return (
    <div className="mt-2">
      <p className="text-sm font-medium">
        {nextTier === "registered" 
          ? "Register for free to get more prompts" 
          : "Upgrade to Premium for unlimited prompts"}
      </p>
      <p className="text-xs text-gray-600 mb-2">
        {tierInfo[nextTier].benefit}
      </p>
      <Button size="sm" className="flex items-center" asChild>
        <a href="/pricing">
          {tierInfo[nextTier].cta}
          <ArrowRight className="ml-1 h-3 w-3" />
        </a>
      </Button>
    </div>
  );
};

export default UpgradePrompt;
