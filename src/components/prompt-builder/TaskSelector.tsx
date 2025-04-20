
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TaskIcon, { TaskType } from "./TaskIcons";

interface TaskOption {
  id: TaskType;
  name: string;
  description: string;
}

const TASK_OPTIONS: TaskOption[] = [
  {
    id: "content",
    name: "Write Content",
    description: "Articles, blog posts, essays, stories",
  },
  {
    id: "code",
    name: "Generate Code",
    description: "Programming, scripts, algorithms",
  },
  {
    id: "idea",
    name: "Brainstorm Ideas",
    description: "Creative concepts, solutions, strategies",
  },
  {
    id: "image",
    name: "Describe Images",
    description: "Image prompts for AI art generators",
  },
  {
    id: "chat",
    name: "Chat Assistant",
    description: "Conversation, Q&A, guidance",
  },
  {
    id: "research",
    name: "Research Assistant",
    description: "Information gathering and analysis",
  },
  {
    id: "data",
    name: "Data Analysis",
    description: "Statistics, insights, patterns",
  },
  {
    id: "seo",
    name: "SEO Content",
    description: "Keyword optimized content",
  },
  {
    id: "knowledge",
    name: "Knowledge Base",
    description: "Documentation, FAQs, guides",
  },
  {
    id: "other",
    name: "Other Tasks",
    description: "Custom AI tasks",
  },
];

interface TaskSelectorProps {
  selectedTask: TaskType | null;
  onTaskSelect: (task: TaskType) => void;
}

const TaskSelector: React.FC<TaskSelectorProps> = ({ selectedTask, onTaskSelect }) => {
  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold mb-3">I want AI to:</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {TASK_OPTIONS.map((task) => (
          <Card
            key={task.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTask === task.id
                ? "border-2 border-purple-500 bg-purple-50"
                : "border border-gray-200 hover:border-purple-300"
            }`}
            onClick={() => onTaskSelect(task.id)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className={`p-3 rounded-full mb-2 ${
                selectedTask === task.id 
                  ? "bg-purple-100 text-purple-700" 
                  : "bg-gray-100 text-gray-700"
              }`}>
                <TaskIcon type={task.id} />
              </div>
              <h3 className="font-medium text-sm mb-1">{task.name}</h3>
              <p className="text-xs text-gray-500">{task.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskSelector;
