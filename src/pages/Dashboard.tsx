import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { History, FileText } from "lucide-react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import PromptHistory from "@/components/dashboard/PromptHistory";
import TemplatesSection from "@/components/dashboard/TemplatesSection";

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

          <DashboardStats user={user} />

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
                <PromptHistory promptHistory={promptHistory} />
              </TabsContent>
              <TabsContent value="templates">
                <TemplatesSection subscription={user.subscription || "free"} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
