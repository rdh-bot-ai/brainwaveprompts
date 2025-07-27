import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PlanTierType } from '@/types/admin-types';

interface PlanBadgeProps {
  plan: PlanTierType;
  className?: string;
}

export const PlanBadge: React.FC<PlanBadgeProps> = ({ plan, className }) => {
  const getVariant = () => {
    switch (plan) {
      case 'ANON':
        return 'outline';
      case 'FREE':
        return 'secondary';
      case 'PREMIUM':
        return 'default';
      default:
        return 'outline';
    }
  };

  const getLabel = () => {
    switch (plan) {
      case 'ANON':
        return 'Anonymous';
      case 'FREE':
        return 'Free';
      case 'PREMIUM':
        return 'Premium';
      default:
        return plan;
    }
  };

  return (
    <Badge variant={getVariant()} className={className}>
      {getLabel()}
    </Badge>
  );
};