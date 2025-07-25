export const PlanMatrix = {
  FREE_TIER: { 
    quota: 2, 
    cache: "none", 
    advOpts: "none", 
    templates: "core", 
    historyDays: 0 
  },
  REGISTERED: { 
    quota: 5, 
    cache: "std", 
    advOpts: "limited", 
    templates: "basic", 
    historyDays: 7 
  },
  PREMIUM: { 
    quota: Infinity, 
    cache: "priority", 
    advOpts: "full", 
    templates: "all", 
    historyDays: 30 
  }
} as const;

export type Plan = keyof typeof PlanMatrix;

export const getPlanConfig = (plan: Plan) => PlanMatrix[plan];

export const canAccessTemplate = (plan: Plan, templateTier: string) => {
  const config = getPlanMatrix(plan);
  switch (config.templates) {
    case "core":
      return templateTier === "free";
    case "basic":
      return ["free", "registered"].includes(templateTier);
    case "all":
      return true;
    default:
      return false;
  }
};

export const getPlanMatrix = (plan: Plan) => PlanMatrix[plan];