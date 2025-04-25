
import React from "react";
import { FileText, Code, Lightbulb, Image, Mail, Search, BarChart3, Tags, Book, HelpCircle } from "lucide-react";

export type TaskType = "content" | "code" | "idea" | "image" | "email" | "research" | "data" | "seo" | "knowledge" | "other";

const TaskIcon: React.FC<{ type: TaskType }> = ({ type }) => {
  switch (type) {
    case "content":
      return <FileText />;
    case "code":
      return <Code />;
    case "idea":
      return <Lightbulb />;
    case "image":
      return <Image />;
    case "email":
      return <Mail />;
    case "research":
      return <Search />;
    case "data":
      return <BarChart3 />;
    case "seo":
      return <Tags />;
    case "knowledge":
      return <Book />;
    case "other":
      return <HelpCircle />;
  }
};

export default TaskIcon;
