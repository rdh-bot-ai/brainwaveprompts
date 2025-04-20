
import React from "react";
import { 
  FileText, Code, Lightbulb, Image, MessageSquare, 
  Book, BarChart2, Search, Database, List 
} from "lucide-react";

export type TaskType = 
  | "content" 
  | "code" 
  | "idea" 
  | "image" 
  | "chat" 
  | "research" 
  | "data" 
  | "seo" 
  | "knowledge" 
  | "other";

interface TaskIconProps {
  type: TaskType;
  size?: number;
  className?: string;
}

export const TaskIcon: React.FC<TaskIconProps> = ({ type, size = 24, className = "" }) => {
  const getIcon = () => {
    switch (type) {
      case "content":
        return <FileText size={size} className={className} />;
      case "code":
        return <Code size={size} className={className} />;
      case "idea":
        return <Lightbulb size={size} className={className} />;
      case "image":
        return <Image size={size} className={className} />;
      case "chat":
        return <MessageSquare size={size} className={className} />;
      case "research":
        return <Search size={size} className={className} />;
      case "data":
        return <Database size={size} className={className} />;
      case "seo":
        return <BarChart2 size={size} className={className} />;
      case "knowledge":
        return <Book size={size} className={className} />;
      default:
        return <List size={size} className={className} />;
    }
  };

  return getIcon();
};

export default TaskIcon;
