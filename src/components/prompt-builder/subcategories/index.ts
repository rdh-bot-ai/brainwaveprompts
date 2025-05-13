
import { TaskType } from "../TaskIcons";
import { SubCategoriesMap } from "../types/subcategory-types";
import { EMAIL_SUBCATEGORIES } from "./email-subcategories";
import { CONTENT_SUBCATEGORIES } from "./content-subcategories";
import { CODE_SUBCATEGORIES } from "./code-subcategories";
import { IDEA_SUBCATEGORIES } from "./idea-subcategories";
import { IMAGE_SUBCATEGORIES } from "./image-subcategories";
import { RESEARCH_SUBCATEGORIES } from "./research-subcategories";
import { DATA_SUBCATEGORIES } from "./data-subcategories";
import { SEO_SUBCATEGORIES } from "./seo-subcategories";
import { KNOWLEDGE_SUBCATEGORIES } from "./knowledge-subcategories";
import { OTHER_SUBCATEGORIES } from "./other-subcategories";

export const SUBCATEGORIES: SubCategoriesMap = {
  email: EMAIL_SUBCATEGORIES,
  content: CONTENT_SUBCATEGORIES,
  code: CODE_SUBCATEGORIES,
  idea: IDEA_SUBCATEGORIES,
  image: IMAGE_SUBCATEGORIES,
  research: RESEARCH_SUBCATEGORIES,
  data: DATA_SUBCATEGORIES,
  seo: SEO_SUBCATEGORIES,
  knowledge: KNOWLEDGE_SUBCATEGORIES,
  other: OTHER_SUBCATEGORIES,
};

export const getDefaultPrompt = (taskType: TaskType, subCategoryId: string): string => {
  const subcategory = SUBCATEGORIES[taskType]?.find(sub => sub.id === subCategoryId);
  return subcategory?.defaultPrompt || "";
};
