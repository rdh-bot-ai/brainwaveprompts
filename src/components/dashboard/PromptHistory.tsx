
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PromptHistoryItem {
  id: string;
  date: string;
  prompt: string;
  taskType: string;
}

interface PromptHistoryProps {
  promptHistory: PromptHistoryItem[];
}

const PromptHistory: React.FC<PromptHistoryProps> = ({ promptHistory }) => {
  return (
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
                    {item.taskType.charAt(0).toUpperCase() + item.taskType.slice(1)}{" "}
                    Prompt
                  </div>
                  <div className="text-xs text-gray-500">{item.date}</div>
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
  );
};

export default PromptHistory;
