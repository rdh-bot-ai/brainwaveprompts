import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TaskIcon, { TaskType } from "./TaskIcons";
import { SUBCATEGORIES } from "./subcategories";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
    id: "email",
    name: "Email Response",
    description: "Professional email templates & responses",
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
  selectedSubCategory: string | null;
  onTaskSelect: (task: TaskType) => void;
  onSubCategorySelect: (subCategory: string) => void;
}

const TaskSelector: React.FC<TaskSelectorProps> = ({ 
  selectedTask, 
  selectedSubCategory,
  onTaskSelect, 
  onSubCategorySelect 
}) => {
  // State to track if subcategories should be shown
  const [showSubCategories, setShowSubCategories] = useState(false);

  // Effect to show subcategories when a task is selected
  useEffect(() => {
    if (selectedTask) {
      setShowSubCategories(true);
    } else {
      setShowSubCategories(false);
    }
  }, [selectedTask]);

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

      {showSubCategories && selectedTask && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Select Specific Type:</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <RadioGroup 
              value={selectedSubCategory || ""} 
              onValueChange={onSubCategorySelect}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {SUBCATEGORIES[selectedTask].map((subCat) => (
                <div key={subCat.id} className="flex items-start space-x-3">
                  <RadioGroupItem 
                    value={subCat.id} 
                    id={`subcat-${subCat.id}`} 
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor={`subcat-${subCat.id}`} 
                      className="font-medium cursor-pointer"
                    >
                      {subCat.name}
                    </Label>
                    <p className="text-sm text-gray-500">{subCat.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSelector;
