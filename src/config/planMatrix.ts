export const PlanMatrix = {
  FREE_TIER:  { quota:2,  historyDays:0,  cacheTTL:0,  adv:"none",    templates:"core",   aiModel:"gpt-3.5-turbo" },
  REGISTERED: { quota:5,  historyDays:7,  cacheTTL:7,  adv:"limited", templates:"basic",  aiModel:"gpt-3.5-turbo" },
  PREMIUM:    { quota:Infinity, historyDays:30, cacheTTL:30, adv:"full", templates:"all", aiModel:"gpt-4-turbo" }
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

export const getAIModel = (plan: Plan): string => {
  return getPlanConfig(plan).aiModel;
};

export const canUseAdvancedAI = (plan: Plan): boolean => {
  return plan === "PREMIUM";
};

export const getModelDisplayName = (model: string): string => {
  switch (model) {
    case "gpt-3.5-turbo":
      return "GPT-3.5 Turbo";
    case "gpt-4-turbo":
      return "GPT-4 Turbo";
    default:
      return model;
  }
};