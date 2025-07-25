import {PlanMatrix, Plan} from '@/config/planMatrix';

export function usePlan(): {plan:Plan} & typeof PlanMatrix[keyof typeof PlanMatrix] {
  const plan = (localStorage.getItem('plan') ?? 'FREE_TIER') as Plan;
  return {plan, ...PlanMatrix[plan]};
}