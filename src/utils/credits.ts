import { Plan, getPlanConfig } from '@/config/planMatrix';

export interface CreditUsage {
  used: number;
  limit: number;
  remaining: number;
  month: string;
}

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const getCreditKey = (userId: string) => `credits:${userId}:${getCurrentMonth()}`;

export const getCreditUsage = (userId: string, plan: Plan): CreditUsage => {
  const key = getCreditKey(userId);
  const stored = localStorage.getItem(key);
  const used = stored ? parseInt(stored, 10) : 0;
  const limit = getPlanConfig(plan).quota;
  
  return {
    used,
    limit: limit === Infinity ? Infinity : limit,
    remaining: limit === Infinity ? Infinity : Math.max(0, limit - used),
    month: getCurrentMonth()
  };
};

export const canConsumeCredits = (userId: string, plan: Plan, amount: number = 1): boolean => {
  const usage = getCreditUsage(userId, plan);
  if (usage.limit === Infinity) return true;
  return usage.remaining >= amount;
};

export const consumeCredits = (userId: string, plan: Plan, amount: number = 1): boolean => {
  if (!canConsumeCredits(userId, plan, amount)) {
    return false;
  }
  
  const key = getCreditKey(userId);
  const current = getCreditUsage(userId, plan);
  localStorage.setItem(key, String(current.used + amount));
  return true;
};

export const resetCreditsIfNewMonth = (userId: string) => {
  // Check if we have any old month data and clean it up
  const currentMonth = getCurrentMonth();
  const currentKey = getCreditKey(userId);
  
  // Clean up old credit data from localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(`credits:${userId}:`) && key !== currentKey) {
      localStorage.removeItem(key);
    }
  }
};