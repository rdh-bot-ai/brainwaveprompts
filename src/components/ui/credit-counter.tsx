import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Zap, Infinity } from 'lucide-react';
import { usePlan } from '@/hooks/usePlan';
import { getRemainingCredits } from '@/utils/credits';

const CreditCounter: React.FC = () => {
  const { plan, quota } = usePlan();
  const remaining = getRemainingCredits(plan);

  if (!isFinite(quota)) {
    return (
      <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 text-purple-700">
        <Infinity className="h-3 w-3 mr-1" />
        Unlimited
      </Badge>
    );
  }

  const isLow = remaining <= 1;
  const isEmpty = remaining <= 0;

  return (
    <Badge 
      variant="outline" 
      className={`${
        isEmpty 
          ? 'bg-red-50 border-red-200 text-red-700' 
          : isLow 
            ? 'bg-orange-50 border-orange-200 text-orange-700'
            : 'bg-green-50 border-green-200 text-green-700'
      }`}
    >
      <Zap className="h-3 w-3 mr-1" />
      {remaining} left
    </Badge>
  );
};

export default CreditCounter;