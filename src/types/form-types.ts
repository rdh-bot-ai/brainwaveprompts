// Form data type definitions for better type safety

export interface BaseFormData {
  // Common fields across all forms
  topic?: string;
  keyPoints?: string;
  targetAudience?: string;
  context?: string;
  constraints?: string;
  tone?: string;
  prompt?: string;
  promptTemplate?: string;
  useTemplate?: boolean;
  buildCustom?: boolean;
  detailLevel?: number;
  includeExamples?: boolean;
}

export interface ContentFormData extends BaseFormData {
  // Content-specific fields
  wordCount?: string;
  researchDepth?: string;
  sources?: string;
  platforms?: string;
  engagement?: string;
  emailType?: string;
  cta?: string;
  audienceLevel?: string;
  prerequisites?: string;
  duration?: string;
  platform?: string;
  frequency?: string;
  sections?: string;
}

export interface CodeFormData extends BaseFormData {
  // Code-specific fields
  language?: string;
  functionality?: string;
  parameters?: string;
  returnType?: string;
  errorHandling?: string;
  framework?: string;
  props?: string;
  styling?: string;
  complexity?: string;
  apiService?: string;
  authMethod?: string;
  endpoints?: string;
  testFramework?: string;
  testTypes?: string;
  codeToTest?: string;
  currentCode?: string;
  refactorGoals?: string;
  databaseType?: string;
  operation?: string;
  requirements?: string;
  includeComments?: boolean;
  optimizePerformance?: boolean;
}

export interface IdeaFormData extends BaseFormData {
  // Idea-specific fields
  challenge?: string;
  targetMarket?: string;
  businessModel?: string;
  investmentLevel?: string;
  targetUsers?: string;
  productType?: string;
  painPoints?: string;
  problemScope?: string;
  stakeholders?: string;
  timeline?: string;
  medium?: string;
  audience?: string;
  emotion?: string;
  product?: string;
  budget?: string;
  channels?: string;
  goals?: string;
  innovationType?: string;
  trends?: string;
  capabilities?: string;
}

export interface ImageFormData extends BaseFormData {
  // Image-specific fields
  subject?: string;
  style?: string;
  details?: string;
  artisticInfluence?: string;
  colorPalette?: string;
  lighting?: string;
  composition?: string;
  cameraSettings?: string;
  lightingConditions?: string;
  photographyStyle?: string;
  postProcessing?: string;
  materials?: string;
  lightingSetup?: string;
  renderingStyle?: string;
  cameraSpecs?: string;
  purpose?: string;
  functionalAspects?: string;
  worldContext?: string;
  designLanguage?: string;
  keyFeatures?: string;
  studioSetup?: string;
  productAngle?: string;
  retouchingLevel?: string;
  characterType?: string;
  personality?: string;
  physicalAttributes?: string;
  costume?: string;
  poses?: string;
  environmentType?: string;
  atmosphere?: string;
  architecturalElements?: string;
  timeOfDay?: string;
  storytelling?: string;
  perspective?: string;
  aspectRatio?: string;
  artReferences?: string;
}

export interface EmailFormData extends BaseFormData {
  // Email-specific fields
  purpose?: string;
  objective?: string;
  company?: string;
  issue?: string;
  specificDetails?: string;
  relatedIssues?: string;
  product?: string;
  benefits?: string;
  keyBenefits?: string;
  emailPurpose?: string;
  recipient?: string;
}

export interface ResearchFormData extends BaseFormData {
  // Research-specific fields
  market?: string;
  specificAspects?: string;
  timePeriod?: string;
  competitors?: string;
  analysisAspects?: string;
  option1?: string;
  option2?: string;
  criteria?: string;
  researchFocus?: string;
  researchTopic?: string;
  researchScope?: string;
  researchDepth?: string;
}

export interface SEOFormData extends BaseFormData {
  // SEO-specific fields
  keyword?: string;
  businessType?: string;
  location?: string;
  industry?: string;
  secondaryKeywords?: string;
  targetKeywords?: string;
  services?: string;
  seoTopic?: string;
  contentGoal?: string;
}

export interface DataFormData extends BaseFormData {
  // Data-specific fields
  dataset?: string;
  audience?: string;
  timeframe?: string;
}

export interface KnowledgeFormData extends BaseFormData {
  // Knowledge-specific fields
  contentType?: string;
}

export interface OtherFormData extends BaseFormData {
  // Other-specific fields
  taskDescription?: string;
  expectedOutput?: string;
  outputFormat?: string;
}

// Union type for all form data
export type FormData = 
  | ContentFormData 
  | CodeFormData 
  | IdeaFormData 
  | ImageFormData 
  | EmailFormData 
  | ResearchFormData 
  | SEOFormData 
  | DataFormData 
  | KnowledgeFormData 
  | OtherFormData;

// Handler type for form changes
export type FormChangeHandler = (field: string, value: string | boolean | number) => void;
