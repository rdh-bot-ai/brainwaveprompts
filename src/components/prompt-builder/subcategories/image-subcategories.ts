
import { SubCategory } from "../types/subcategory-types";

export const IMAGE_SUBCATEGORIES: SubCategory[] = [
  {
    id: "illustration",
    name: "Illustration",
    description: "Descriptive drawing prompts",
    defaultPrompt: "Create a detailed prompt for an AI illustration of [subject], featuring [details]. The style should be [style], with [colors] color palette. Include specific details about lighting, perspective, and mood.",
  },
  {
    id: "photograph",
    name: "Photography",
    description: "Realistic photo prompts",
    defaultPrompt: "Generate a prompt for a photorealistic image of [subject] with [details]. Specify camera settings like [settings], lighting conditions such as [lighting], and composition details like [composition].",
  },
  {
    id: "3d",
    name: "3D Rendering",
    description: "Three-dimensional visual prompts",
    defaultPrompt: "Create a detailed prompt for a 3D rendering of [subject]. Include specifications for materials, textures, lighting setup, camera angle, and environment details. The style should be [style].",
  },
  {
    id: "concept",
    name: "Concept Art",
    description: "Visuals for products or media",
    defaultPrompt: "Generate a prompt for concept art of [subject] for [purpose]. Include details about the aesthetic, mood, key visual elements, color scheme, and stylistic references to inform the creation.",
  },
  {
    id: "product",
    name: "Product Photography",
    description: "Product showcase images",
    defaultPrompt: "Create a product photography prompt for [product] that highlights [key features]. Include lighting setup, composition, and styling details.",
  },
  {
    id: "character",
    name: "Character Design",
    description: "Character concept art",
    defaultPrompt: "Generate a character design prompt for [character type]. Include details about personality, appearance, poses, and artistic style.",
  },
  {
    id: "environment",
    name: "Environment Design",
    description: "Scene and location visuals",
    defaultPrompt: "Create an environment design prompt for [location/scene]. Specify atmosphere, lighting, key elements, and architectural/natural details.",
  }
];
