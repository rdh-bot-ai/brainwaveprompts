export type PlanTier = 'ANON' | 'FREE' | 'PREMIUM';

export interface DateRange {
  start: string; // ISO
  end: string;   // ISO
}

export interface RevenuePoint {
  date: string;        // month start ISO
  amountCents: number; // gross
}

export interface TokenPoint {
  date: string;
  plan: PlanTier;
  tokens: number;
  costCents: number;   // computed or sourced
}

export interface RevenueCostSummary {
  totalRevenueCentsPaid: number;

  totalApiCostCentsAll: number;
  totalTokensAll: number;

  apiCostCentsPaid: number;
  tokensPaid: number;

  apiCostCentsRegistered: number;
  tokensRegistered: number;

  apiCostCentsFree: number;
  tokensFree: number;

  // Optional extras
  mrrCents?: number;
  arpuCents?: number;
  paidUserCount?: number;

  estimated: boolean; // true if any values were computed via rates
}

// Mock data adapter - replace with real data sources later
export const getRevenueCostSummary = (period: string): RevenueCostSummary => {
  // Mock calculation based on period
  const multiplier = period === 'last12months' ? 2 : period === 'thisyear' ? 1.5 : 1;
  
  return {
    totalRevenueCentsPaid: Math.round(12000 * multiplier), // $120.00
    
    totalApiCostCentsAll: Math.round(8500 * multiplier), // $85.00
    totalTokensAll: Math.round(125000 * multiplier),
    
    apiCostCentsPaid: Math.round(5500 * multiplier), // $55.00
    tokensPaid: Math.round(75000 * multiplier),
    
    apiCostCentsRegistered: Math.round(2500 * multiplier), // $25.00
    tokensRegistered: Math.round(35000 * multiplier),
    
    apiCostCentsFree: Math.round(500 * multiplier), // $5.00
    tokensFree: Math.round(15000 * multiplier),
    
    mrrCents: Math.round(4000 * multiplier), // $40.00
    arpuCents: Math.round(2000 * multiplier), // $20.00
    paidUserCount: Math.round(6 * multiplier),
    
    estimated: true // Mark as estimated since using mock rates
  };
};

export const getRevenuePoints = (period: string): RevenuePoint[] => {
  const months = period === 'last12months' ? 12 : 6;
  const points: RevenuePoint[] = [];
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    
    points.push({
      date: monthStart.toISOString(),
      amountCents: Math.round((8000 + Math.random() * 4000) * (1 + i * 0.1))
    });
  }
  
  return points;
};

export const getTokenPointsByPlan = (period: string): TokenPoint[] => {
  const months = period === 'last12months' ? 12 : 6;
  const points: TokenPoint[] = [];
  const plans: PlanTier[] = ['PREMIUM', 'FREE', 'ANON'];
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    
    plans.forEach(plan => {
      const baseTokens = plan === 'PREMIUM' ? 50000 : plan === 'FREE' ? 25000 : 10000;
      const tokens = Math.round(baseTokens * (0.8 + Math.random() * 0.4));
      const costCents = Math.round(tokens * 0.002 * 100); // $0.002 per token
      
      points.push({
        date: monthStart.toISOString(),
        plan,
        tokens,
        costCents
      });
    });
  }
  
  return points;
};