
import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { History, BarChart, FileText, Settings } from "lucide-react";

interface PromptHistoryItem {
  id: string;
  date: string;
  prompt: string;
  taskType: string;
}

const Dashboard = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [promptHistory, setPromptHistory] = useState<PromptHistoryItem[]>([]);

  useEffect(() => {
    // Mock data - in a real app, this would be fetched from an API
    const mockHistory: PromptHistoryItem[] = [
      {
        id: "1",
        date: "2023-04-20",
        prompt: "Write a blog post about the benefits of AI in healthcare with a professional tone and include 3 examples of real-world applications.",
        taskType: "content",
      },
      {
        id: "2",
        date: "2023-04-19",
        prompt: "Generate Python code to create a web scraper that extracts product information from e-commerce websites. Include comprehensive comments and error handling.",
        taskType: "code",
      },
      {
        id: "3",
        date: "2023-04-18",
        prompt: "Brainstorm 5 innovative business ideas for a sustainability-focused startup in the food industry, considering current market trends and consumer preferences.",
        taskType: "idea",
      },
    ];

    setPromptHistory(mockHistory);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Dashboard
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button asChild>
                <a href="/builder">Create New Prompt</a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Prompts This Month
                </CardTitle>
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
                <CardTitle className="text-sm font-medium">
                  Subscription
                </CardTitle>
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
                <CardTitle className="text-sm font-medium">
                  Saved Prompts
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{promptHistory.length}</div>
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

          <div className="mt-8">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="history">
                  <History className="mr-2 h-4 w-4" />
                  Prompt History
                </TabsTrigger>
                <TabsTrigger value="templates">
                  <FileText className="mr-2 h-4 w-4" />
                  My Templates
                </TabsTrigger>
              </TabsList>
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Prompts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {promptHistory.length > 0 ? (
                      <div className="space-y-6">
                        {promptHistory.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="text-sm font-medium">
                                {item.taskType.charAt(0).toUpperCase() +
                                  item.taskType.slice(1)}{" "}
                                Prompt
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.date}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">
                              {item.prompt.length > 200
                                ? `${item.prompt.substring(0, 200)}...`
                                : item.prompt}
                            </p>
                            <div className="mt-3 flex space-x-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Use Again
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">
                          You haven't created any prompts yet.
                        </p>
                        <Button asChild>
                          <a href="/builder">Create Your First Prompt</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="templates">
                <Card>
                  <CardHeader>
                    <CardTitle>My Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">
                        {user.subscription === "free"
                          ? "Templates are available for Registered and Premium users."
                          : "You haven't saved any templates yet."}
                      </p>
                      {user.subscription === "free" ? (
                        <Button asChild>
                          <a href="/pricing">Upgrade Now</a>
                        </Button>
                      ) : (
                        <Button>Create Template</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
