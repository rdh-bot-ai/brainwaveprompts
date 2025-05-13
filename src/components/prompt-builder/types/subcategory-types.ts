
import { TaskType } from "../TaskIcons";

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  defaultPrompt: string;
}

export type SubCategoriesMap = {
  [key in TaskType]: SubCategory[];
};
