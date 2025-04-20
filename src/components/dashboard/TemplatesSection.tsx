
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TemplatesSectionProps {
  subscription: "free" | "registered" | "premium";
}

const TemplatesSection: React.FC<TemplatesSectionProps> = ({ subscription }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {subscription === "free"
              ? "Templates are available for Registered and Premium users."
              : "You haven't saved any templates yet."}
          </p>
          {subscription === "free" ? (
            <Button asChild>
              <a href="/pricing">Upgrade Now</a>
            </Button>
          ) : (
            <Button>Create Template</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplatesSection;
