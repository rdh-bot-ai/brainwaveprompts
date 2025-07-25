import React, { useContext } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/contexts/AuthContext";
import { Plan } from "@/config/planMatrix";
const PricingFeature: React.FC<{
  included: boolean;
  feature: string;
  tier?: "free" | "registered" | "premium";
}> = ({
  included,
  feature,
  tier
}) => <div className="flex items-center space-x-2 py-1">
    {included ? <Check className={`h-4 w-4 ${tier === "premium" ? "text-purple-600" : "text-green-600"}`} /> : <X className="h-4 w-4 text-gray-300" />}
    <span className={`text-sm ${!included ? "text-gray-400" : ""}`}>{feature}</span>
  </div>;
const PricingTiers: React.FC = () => {
  const {
    user,
    upgradePlan
  } = useContext(AuthContext);

  // Mock upgrade function - in a real app, this would handle payment processing
  const handleUpgrade = (tier: "free" | "registered" | "premium") => {
    if (!user) {
      // Redirect to sign up page for non-authenticated users
      window.location.href = "/signup";
      return;
    }
    
    const planMap: Record<string, Plan> = {
      "free": "FREE_TIER",
      "registered": "REGISTERED",
      "premium": "PREMIUM"
    };
    
    if (tier === "registered") {
      upgradePlan(planMap[tier]);
    } else if (tier === "premium") {
      // In a real app, this would redirect to payment gateway
      alert("This would redirect to a payment gateway in a real application");
    }
  };
  const getCurrentPlan = () => {
    if (!user) return null;
    // Map new plan to old pricing tier names for UI compatibility
    const planMap: Record<string, string> = {
      "FREE_TIER": "free",
      "REGISTERED": "registered", 
      "PREMIUM": "premium"
    };
    return planMap[user.plan] || "free";
  };
  const currentPlan = getCurrentPlan();
  return <div className="grid gap-8 md:grid-cols-3">
      {/* Free Tier */}
      <Card className={`border flex flex-col h-full ${currentPlan === "free" ? "border-blue-200 bg-blue-50" : ""}`}>
        <CardHeader>
          {currentPlan === "free" && <div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              Current Plan
            </div>}
          <CardTitle className="text-xl">Free Tier</CardTitle>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">$0</span>
            <span className="ml-1 text-gray-500">/month</span>
          </div>
          <CardDescription>
            Start getting better results from AI with basic prompt enhancement.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-2">
            <PricingFeature included={true} feature="2 prompt enhancements per month" tier="free" />
            <PricingFeature included={false} feature="Advanced options" tier="free" />
            <PricingFeature included={false} feature="Template access" tier="free" />
            <PricingFeature included={false} feature="Export options" tier="free" />
            <PricingFeature included={false} feature="Collaboration features" tier="free" />
            <PricingFeature included={false} feature="Priority support" tier="free" />
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          {currentPlan === "free" ? <Button className="w-full" disabled>
              Current Plan
            </Button> : <Button variant="outline" className="w-full" onClick={() => handleUpgrade("free")}>
              Downgrade
            </Button>}
        </CardFooter>
      </Card>

      {/* Registered Tier */}
      <Card className={`border flex flex-col h-full ${currentPlan === "registered" ? "border-green-200 bg-green-50" : ""}`}>
        <CardHeader>
          {currentPlan === "registered" && <div className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
              Current Plan
            </div>}
          <CardTitle className="text-xl">Registered</CardTitle>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">$0</span>
            <span className="ml-1 text-gray-500">/month</span>
          </div>
          <CardDescription>
            Take your AI interactions to the next level with enhanced prompts.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-2">
            <PricingFeature included={true} feature="5 prompt enhancements per month" tier="registered" />
            <PricingFeature included={true} feature="Standard prompt caching" tier="registered" />
            <PricingFeature included={true} feature="Limited advanced options" tier="registered" />
            <PricingFeature included={true} feature="Basic templates" tier="registered" />
            <PricingFeature included={true} feature="7-day prompt history" tier="registered" />
            <PricingFeature included={false} feature="Collaboration features" tier="registered" />
            <PricingFeature included={false} feature="Priority support" tier="registered" />
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          {currentPlan === "registered" ? <Button className="w-full" disabled>
              Current Plan
            </Button> : <Button className="w-full" onClick={() => handleUpgrade("registered")} variant={currentPlan === "premium" ? "outline" : "default"}>
              {currentPlan === "premium" ? "Downgrade" : "Register Free"}
            </Button>}
        </CardFooter>
      </Card>

      {/* Premium Tier */}
      <Card className={`border flex flex-col h-full ${currentPlan === "premium" ? "border-purple-200 bg-purple-50" : "border-purple-100"}`}>
        <CardHeader className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-t-lg">
          {currentPlan === "premium" && <div className="mb-2 inline-block rounded-full bg-white bg-opacity-20 px-3 py-1 text-xs font-medium text-white">
              Current Plan
            </div>}
          <CardTitle className="text-xl">Premium</CardTitle>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">$18</span>
            <span className="ml-1 text-gray-100">/month</span>
          </div>
          <CardDescription className="text-gray-100">
            Unlock the full potential of AI with our most powerful prompt enhancements.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 flex-grow">
          <div className="space-y-2">
            <PricingFeature included={true} feature="Unlimited prompt enhancements" tier="premium" />
            <PricingFeature included={true} feature="Priority prompt caching" tier="premium" />
            <PricingFeature included={true} feature="Full access to advanced options" tier="premium" />
            <PricingFeature included={true} feature="All templates + Premium" tier="premium" />
            <PricingFeature included={true} feature="30-day prompt history" tier="premium" />
            <PricingFeature included={true} feature="Priority support" tier="premium" />
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          {currentPlan === "premium" ? <Button className="w-full" disabled>
              Current Plan
            </Button> : <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" onClick={() => handleUpgrade("premium")}>
              Upgrade to Premium
            </Button>}
        </CardFooter>
      </Card>
    </div>;
};
export default PricingTiers;