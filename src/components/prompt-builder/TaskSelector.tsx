
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added Button import
import TaskIcon, { TaskType } from "./TaskIcons";
import { SUBCATEGORIES } from "./subcategories";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Search, FileText } from "lucide-react"; // Added FileText import

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
  customTemplates?: any[]; // Added customTemplates prop
  onLoadCustomTemplate?: (template: any) => void; // Added onLoadCustomTemplate prop
}

const TaskSelector: React.FC<TaskSelectorProps> = ({ 
  selectedTask, 
  selectedSubCategory,
  onTaskSelect, 
  onSubCategorySelect,
  customTemplates,
  onLoadCustomTemplate
}) => {
  // State to track if subcategories should be shown
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSubcategories, setFilteredSubcategories] = useState(
    selectedTask ? SUBCATEGORIES[selectedTask] : []
  );

  // Effect to show subcategories when a task is selected
  useEffect(() => {
    if (selectedTask) {
      setShowSubCategories(true);
      setFilteredSubcategories(SUBCATEGORIES[selectedTask]);
      setSearchQuery("");
    } else {
      setShowSubCategories(false);
    }
  }, [selectedTask]);

  // Filter subcategories based on search query
  useEffect(() => {
    if (!selectedTask || !searchQuery) {
      setFilteredSubcategories(selectedTask ? SUBCATEGORIES[selectedTask] : []);
      return;
    }

    const filtered = SUBCATEGORIES[selectedTask].filter(
      subcat => 
        subcat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        subcat.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSubcategories(filtered);
  }, [searchQuery, selectedTask]);

  return (
    <div className="py-4 space-y-8">
      {customTemplates && customTemplates.length > 0 && onLoadCustomTemplate && (
        <div className="mb-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Load from Your Custom Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {customTemplates.map((template) => (
              <Button
                key={template.name} // Assuming name is unique, or use a proper ID if available
                variant="outline"
                className="w-full justify-start text-left h-auto py-2 px-3 border-indigo-200 hover:bg-indigo-100"
                onClick={() => onLoadCustomTemplate(template)}
              >
                <FileText className="h-4 w-4 mr-2 text-indigo-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-indigo-800">{template.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{template.taskType} - {template.subCategory.replace(/-/g, ' ')}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          {customTemplates && customTemplates.length > 0 ? "Or, select a task type to get started:" : "I want AI to:"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TASK_OPTIONS.map((task) => (
            <Card
              key={task.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTask === task.id
                  ? "border-2 border-purple-500 bg-purple-50 shadow-sm"
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

      {showSubCategories && selectedTask && (
        <div className="animate-fadeIn">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Select Specific Type:</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            {filteredSubcategories.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No matching types found. Try a different search term.
              </div>
            ) : (
              <RadioGroup 
                value={selectedSubCategory || ""} 
                onValueChange={onSubCategorySelect}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {filteredSubcategories.map((subCat) => (
                  <div 
                    key={subCat.id} 
                    className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                      selectedSubCategory === subCat.id ? 'bg-purple-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <RadioGroupItem 
                      value={subCat.id} 
                      id={`subcat-${subCat.id}`} 
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label 
                        htmlFor={`subcat-${subCat.id}`} 
                        className="font-medium cursor-pointer text-gray-800"
                      >
                        {subCat.name}
                      </Label>
                      <p className="text-sm text-gray-500">{subCat.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSelector;
