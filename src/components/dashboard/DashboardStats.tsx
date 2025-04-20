
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Settings, BarChart } from "lucide-react";

interface DashboardStatsProps {
  user: {
    subscription?: "free" | "registered" | "premium";
    promptsRemaining?: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prompts This Month</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {user.subscription === "premium" ? (
              "Unlimited"
            ) : (
              <>
                {user.promptsRemaining || 0}/
                {user.subscription === "registered" ? "5" : "2"}
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {user.subscription === "premium"
              ? "Premium subscription"
              : user.subscription === "registered"
              ? "Registered tier"
              : "Free tier"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscription</CardTitle>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">
            {user.subscription || "Free"}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {user.subscription === "premium"
                ? "Unlimited access"
                : "Limited access"}
            </p>
            {user.subscription !== "premium" && (
              <Button variant="outline" size="sm" asChild>
                <a href="/pricing">Upgrade</a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saved Prompts</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{0}</div>
          <p className="text-xs text-muted-foreground">
            {user.subscription === "premium"
              ? "Unlimited history"
              : user.subscription === "registered"
              ? "30-day history"
              : "7-day history"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
