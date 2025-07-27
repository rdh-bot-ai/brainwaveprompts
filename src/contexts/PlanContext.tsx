import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlanTierType } from '@/types/admin-types';

interface PlanContextType {
  currentPlan: PlanTierType;
  setPlan: (plan: PlanTierType) => void;
  canAccessTier: (requiredTier: PlanTierType) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState<PlanTierType>(() => {
    return (localStorage.getItem('user_plan') as PlanTierType) || 'ANON';
  });

  useEffect(() => {
    localStorage.setItem('user_plan', currentPlan);
  }, [currentPlan]);

  const setPlan = (plan: PlanTierType) => {
    setCurrentPlan(plan);
  };

  const canAccessTier = (requiredTier: PlanTierType): boolean => {
    const tierHierarchy: Record<PlanTierType, number> = {
      'ANON': 0,
      'FREE': 1,
      'PREMIUM': 2,
    };
    
    return tierHierarchy[currentPlan] >= tierHierarchy[requiredTier];
  };

  return (
    <PlanContext.Provider value={{ currentPlan, setPlan, canAccessTier }}>
      {children}
    </PlanContext.Provider>
  );
};