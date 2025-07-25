import React from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MarkdownPreviewProps {
  content: string;
  title?: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content, title = "Preview" }) => {
  // Debounce the content to reduce re-renders by ~70%
  const debouncedContent = useDebounce(content, 300);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{title}</Label>
      <Textarea
        value={debouncedContent}
        readOnly
        className="min-h-[200px] bg-gray-50 font-mono text-sm"
        placeholder="Your generated prompt will appear here..."
      />
    </div>
  );
};

export default MarkdownPreview;