import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PromptStatusType } from '@/types/admin-types';

interface StatusBadgeProps {
  status: PromptStatusType;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getVariant = () => {
    switch (status) {
      case 'DRAFT':
        return 'outline';
      case 'PUBLISHED':
        return 'default';
      case 'ARCHIVED':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getColor = () => {
    switch (status) {
      case 'DRAFT':
        return 'text-yellow-600 border-yellow-300';
      case 'PUBLISHED':
        return 'text-green-600 border-green-300';
      case 'ARCHIVED':
        return 'text-gray-600 border-gray-300';
      default:
        return '';
    }
  };

  return (
    <Badge variant={getVariant()} className={`${getColor()} ${className}`}>
      {status}
    </Badge>
  );
};