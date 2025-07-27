import { Badge } from "@/components/ui/badge";
import { PlanTier } from "@/types/prompt-management";
import { cn } from "@/lib/utils";

interface PlanBadgeProps {
  plan: PlanTier;
  className?: string;
}

export function PlanBadge({ plan, className }: PlanBadgeProps) {
  const variants = {
    ANON: {
      variant: "outline" as const,
      className: "border-muted-foreground/30 text-muted-foreground",
      label: "Public"
    },
    FREE: {
      variant: "secondary" as const,
      className: "bg-blue-100 text-blue-800 border-blue-200",
      label: "Free"
    },
    PREMIUM: {
      variant: "default" as const,
      className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0",
      label: "Premium"
    }
  };

  const config = variants[plan];

  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}