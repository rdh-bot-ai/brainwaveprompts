export const PlanMatrix = {
  FREE_TIER:  { quota:2,  historyDays:0,  cacheTTL:0,  adv:"none",    templates:"core"   },
  REGISTERED: { quota:5,  historyDays:7,  cacheTTL:7,  adv:"limited", templates:"basic"  },
  PREMIUM:    { quota:Infinity, historyDays:30, cacheTTL:30, adv:"full", templates:"all" }
} as const;

export type Plan = keyof typeof PlanMatrix;

export const getPlanConfig = (plan: Plan) => PlanMatrix[plan];

export const canAccessTemplate = (plan: Plan, templateTier: string) => {
  const config = getPlanConfig(plan);
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