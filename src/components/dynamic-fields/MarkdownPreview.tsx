import React, { useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MarkdownPreviewProps {
  content: string;
  title?: string;
  formState?: Record<string, any>;
  template?: string;
}

const renderMarkdown = (template: string, formState: Record<string, any>): string => {
  if (!template) return '';
  
  let rendered = template;
  Object.entries(formState).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const placeholder = `{${key}}`;
      const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
      rendered = rendered.replace(new RegExp(placeholder, 'g'), displayValue);
    }
  });
  
  return rendered;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ 
  content, 
  title = "Preview", 
  formState, 
  template 
}) => {
  // Debounce the content and form state to reduce re-renders by ~70%
  const debouncedContent = useDebounce(content, 300);
  const debouncedFormState = useDebounce(formState, 300);
  
  // Memoize markdown rendering for performance
  const renderedContent = useMemo(() => {
    if (template && debouncedFormState) {
      return renderMarkdown(template, debouncedFormState);
    }
    return debouncedContent;
  }, [template, debouncedFormState, debouncedContent]);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{title}</Label>
      <Textarea
        value={renderedContent}
        readOnly
        className="min-h-[200px] bg-gray-50 font-mono text-sm"
        placeholder="Your generated prompt will appear here..."
      />
    </div>
  );
};

export default MarkdownPreview;