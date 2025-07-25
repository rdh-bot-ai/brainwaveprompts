
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Settings, BarChart } from "lucide-react";

import { CreditUsage } from "@/contexts/AuthContext";

interface DashboardStatsProps {
  user: {
    plan: string;
  };
  creditUsage: CreditUsage | null;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ user, creditUsage }) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prompts This Month</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {user.plan === "PREMIUM" ? (
              "Unlimited"
            ) : (
              <>
                {creditUsage?.used || 0}/
                {creditUsage?.limit || 0}
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {user.plan === "PREMIUM"
              ? "Premium subscription"
              : user.plan === "REGISTERED"
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
            {user.plan === "FREE_TIER" ? "Free" : user.plan === "REGISTERED" ? "Registered" : "Premium"}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {user.plan === "PREMIUM"
                ? "Unlimited access"
                : "Limited access"}
            </p>
            {user.plan !== "PREMIUM" && (
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
            {user.plan === "PREMIUM"
              ? "Unlimited history"
              : user.plan === "REGISTERED"
              ? "7-day history"
              : "No history"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
