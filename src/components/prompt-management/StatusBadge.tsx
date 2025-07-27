import { Badge } from "@/components/ui/badge";
import { PromptStatus } from "@/types/prompt-management";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: PromptStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    DRAFT: {
      variant: "outline" as const,
      className: "border-yellow-300 text-yellow-700 bg-yellow-50",
      label: "Draft"
    },
    PUBLISHED: {
      variant: "outline" as const,
      className: "border-green-300 text-green-700 bg-green-50",
      label: "Published"
    },
    ARCHIVED: {
      variant: "outline" as const,
      className: "border-gray-300 text-gray-700 bg-gray-50",
      label: "Archived"
    }
  };

  const config = variants[status];

  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}