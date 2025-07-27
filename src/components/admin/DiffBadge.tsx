import React from 'react';
import { Badge } from '@/components/ui/badge';

interface DiffBadgeProps {
  type: 'INSERT' | 'UPDATE' | 'INVALID';
  className?: string;
}

export const DiffBadge: React.FC<DiffBadgeProps> = ({ type, className }) => {
  const getVariant = () => {
    switch (type) {
      case 'INSERT':
        return 'default';
      case 'UPDATE':
        return 'secondary';
      case 'INVALID':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'INSERT':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'UPDATE':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'INVALID':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return '';
    }
  };

  return (
    <Badge variant={getVariant()} className={`${getColor()} ${className}`}>
      {type}
    </Badge>
  );
};