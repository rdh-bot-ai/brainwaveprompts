
import React from "react";
import TaskIcon, { TaskType } from "./TaskIcons";
import { SUBCATEGORIES } from "./subcategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

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
  const availableSubcategories = selectedTask ? SUBCATEGORIES[selectedTask] : [];

  return (
    <div className="space-y-6">
      {/* Task Selection */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">I want AI to:</h3>
        <div className="space-y-2">
          {TASK_OPTIONS.map((task) => (
            <div
              key={task.id}
              className={`cursor-pointer transition-all rounded-lg p-3 flex items-center space-x-3 border ${
                selectedTask === task.id
                  ? "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-300 shadow-sm"
                  : "hover:bg-gray-50 border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onTaskSelect(task.id)}
            >
              <div className={`p-2 rounded-lg ${
                selectedTask === task.id 
                  ? "bg-purple-100 text-purple-700" 
                  : "bg-gray-100 text-gray-600"
              }`}>
                <TaskIcon type={task.id} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-sm ${
                  selectedTask === task.id ? "text-purple-900" : "text-gray-800"
                }`}>
                  {task.name}
                </h4>
                <p className="text-xs text-gray-500 truncate">{task.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subcategory Selection Dropdown */}
      {selectedTask && availableSubcategories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Select specific type:</h3>
          <Select value={selectedSubCategory || ""} onValueChange={onSubCategorySelect}>
            <SelectTrigger className="w-full bg-white border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Choose a specific type..." />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg max-h-60">
              {availableSubcategories.map((subCat) => (
                <SelectItem 
                  key={subCat.id} 
                  value={subCat.id}
                  className="hover:bg-purple-50 focus:bg-purple-50 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{subCat.name}</span>
                    <span className="text-xs text-gray-500 mt-0.5">{subCat.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default TaskSelector;