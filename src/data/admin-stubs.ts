import { Category, Prompt } from '@/types/admin-types';

// Demo Categories
export const DEMO_CATEGORIES: Category[] = [
  {
    slug: 'content-writing',
    name: 'Content Writing',
    description: 'Templates for creating various types of written content',
    sort_order: 1,
    is_featured: true,
  },
  {
    slug: 'social-media',
    name: 'Social Media',
    description: 'Social media post templates and strategies',
    sort_order: 2,
    is_featured: true,
  },
  {
    slug: 'business',
    name: 'Business',
    description: 'Business communication and strategy templates',
    sort_order: 3,
    is_featured: false,
  },
  {
    slug: 'education',
    name: 'Education',
    description: 'Educational content and learning materials',
    sort_order: 4,
    is_featured: false,
  },
];

// Demo Prompts
export const DEMO_PROMPTS: Prompt[] = [
  {
    slug: 'blog-post-outline',
    title: 'Blog Post Outline Generator',
    short_description: 'Create structured outlines for blog posts',
    content: 'Create a comprehensive blog post outline for the topic: [topic]. Include an engaging introduction, 3-5 main sections with subpoints, and a strong conclusion. Target audience: [audience]. Tone: [tone].',
    category_slug: 'content-writing',
    category_name: 'Content Writing',
    visibility: 'FREE',
    status: 'PUBLISHED',
    tags: ['blog', 'outline', 'content'],
    is_featured: true,
    sort_order: 1,
    version: 1,
  },
  {
    slug: 'social-media-campaign',
    title: 'Social Media Campaign Planner',
    short_description: 'Plan comprehensive social media campaigns',
    content: 'Create a 30-day social media campaign for [product/service] targeting [audience]. Include post types, content themes, hashtag strategies, and engagement tactics for [platform]. Goals: [goals].',
    category_slug: 'social-media',
    category_name: 'Social Media',
    visibility: 'PREMIUM',
    status: 'PUBLISHED',
    tags: ['campaign', 'social media', 'strategy'],
    is_featured: true,
    sort_order: 1,
    version: 1,
  },
  {
    slug: 'email-template',
    title: 'Professional Email Template',
    short_description: 'Generate professional email templates',
    content: 'Write a professional email for [purpose]. Recipient: [recipient]. Tone: [tone]. Include clear subject line, proper greeting, main message, and call-to-action.',
    category_slug: 'business',
    category_name: 'Business',
    visibility: 'FREE',
    status: 'PUBLISHED',
    tags: ['email', 'business', 'communication'],
    is_featured: false,
    sort_order: 2,
    version: 1,
  },
  {
    slug: 'lesson-plan',
    title: 'Interactive Lesson Plan',
    short_description: 'Create engaging lesson plans',
    content: 'Design a 45-minute lesson plan for [subject] targeting [grade level]. Include learning objectives, activities, materials needed, and assessment methods. Theme: [theme].',
    category_slug: 'education',
    category_name: 'Education',
    visibility: 'PREMIUM',
    status: 'DRAFT',
    tags: ['education', 'lesson', 'teaching'],
    is_featured: false,
    sort_order: 1,
    version: 1,
  },
  {
    slug: 'product-description',
    title: 'Product Description Writer',
    short_description: 'Write compelling product descriptions',
    content: 'Write a compelling product description for [product name]. Highlight key features: [features]. Target audience: [audience]. Include benefits, specifications, and persuasive call-to-action.',
    category_slug: 'business',
    category_name: 'Business',
    visibility: 'FREE',
    status: 'PUBLISHED',
    tags: ['product', 'description', 'marketing'],
    is_featured: true,
    sort_order: 1,
    version: 1,
  },
  {
    slug: 'instagram-story',
    title: 'Instagram Story Series',
    short_description: 'Create engaging Instagram story sequences',
    content: 'Create a 5-part Instagram story series about [topic]. Include engaging visuals suggestions, interactive elements (polls, questions), and clear storytelling arc. Brand: [brand].',
    category_slug: 'social-media',
    category_name: 'Social Media',
    visibility: 'PREMIUM',
    status: 'ARCHIVED',
    tags: ['instagram', 'stories', 'social'],
    is_featured: false,
    sort_order: 3,
    version: 1,
  },
];

// Local storage keys
export const STORAGE_KEYS = {
  CATEGORIES: 'admin_categories',
  PROMPTS: 'admin_prompts',
  FILTERS: 'admin_filters',
} as const;

// Storage utilities
export const getStoredCategories = (): Category[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return stored ? JSON.parse(stored) : DEMO_CATEGORIES;
  } catch {
    return DEMO_CATEGORIES;
  }
};

export const getStoredPrompts = (): Prompt[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROMPTS);
    return stored ? JSON.parse(stored) : DEMO_PROMPTS;
  } catch {
    return DEMO_PROMPTS;
  }
};

export const setStoredCategories = (categories: Category[]) => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
};

export const setStoredPrompts = (prompts: Prompt[]) => {
  localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(prompts));
};

export const resetDemoData = () => {
  localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
  localStorage.removeItem(STORAGE_KEYS.PROMPTS);
  localStorage.removeItem(STORAGE_KEYS.FILTERS);
};

// Sample CSV content for download
export const SAMPLE_CSV_CONTENT = `slug,title,short_description,content,category_slug,category_name,category_description,visibility,status,tags,is_featured,sort_order,version
test-prompt-1,Test Prompt 1,A test prompt for validation,Create content about [topic] for [audience],content-writing,Content Writing,Content creation templates,FREE,PUBLISHED,test|content,true,1,1
test-prompt-2,Test Prompt 2,Another test prompt,Write a social media post about [product] for [platform],social-media,Social Media,Social media templates,PREMIUM,DRAFT,social|test,false,2,1
invalid-prompt,Invalid Prompt,Missing content field,,business,Business,Business templates,INVALID_TIER,PUBLISHED,business,false,3,abc`;