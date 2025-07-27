import { Badge } from "@/components/ui/badge";
import { ImportAction } from "@/types/prompt-management";
import { cn } from "@/lib/utils";

interface DiffBadgeProps {
  action: ImportAction;
  className?: string;
}

export function DiffBadge({ action, className }: DiffBadgeProps) {
  const variants = {
    INSERT: {
      variant: "outline" as const,
      className: "border-green-300 text-green-700 bg-green-50",
      label: "INSERT"
    },
    UPDATE: {
      variant: "outline" as const,
      className: "border-amber-300 text-amber-700 bg-amber-50",
      label: "UPDATE"
    },
    INVALID: {
      variant: "outline" as const,
      className: "border-red-300 text-red-700 bg-red-50",
      label: "INVALID"
    }
  };

  const config = variants[action];

  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}