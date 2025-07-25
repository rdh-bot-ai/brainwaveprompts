import React, { useState, useContext, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Sparkle, Copy, Lightbulb, MessageCircle, CheckCircle, Clock, Star, Menu } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import { 
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import TaskSelector from "./TaskSelector";
import PromptForm from "./PromptForm";
import { TaskType } from "./TaskIcons";
import UpgradePrompt from "../subscription/UpgradePrompt";
import { getDefaultPrompt, SUBCATEGORIES } from "./subcategories";
import { useToast } from "@/hooks/use-toast";
import { validateFormData, extractPlaceholders } from "@/utils/placeholderValidator";

const PromptBuilder: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({
    useTemplate: true,
    buildCustom: false,
    detailLevel: 2,
    tone: "professional",
    includeExamples: false,
    defaultEditorTab: "basic"
  });
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [canGenerate, setCanGenerate] = useState<boolean>(true);
  const [promptsRemaining, setPromptsRemaining] = useState<number | null>(null);
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [loadedFromLibrary, setLoadedFromLibrary] = useState<boolean>(false);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    if (user) {
      setPromptsRemaining(user.promptsRemaining || 0);

      // Load recent prompts from localStorage if user is logged in
      const savedPrompts = localStorage.getItem(`${user.id}_recent_prompts`);
      if (savedPrompts) {
        try {
          setRecentPrompts(JSON.parse(savedPrompts).slice(0, 3));
        } catch (e) {
          // Silently handle parsing errors in production
          if (process.env.NODE_ENV === 'development') {
            console.error("Error parsing saved prompts", e);
          }
        }
      }
    }
  }, [user]);
  
  // Listen for the loadTemplate event
  useEffect(() => {
    const handleLoadTemplate = (event: CustomEvent) => {
      const { prompt, openInAdvancedEditor, title, category, description } = event.detail;
      
      // Template loading for development debugging only
      if (process.env.NODE_ENV === 'development') {
        console.log("Loading template from event:", { prompt, title, category, description });
      }
      setDebugInfo(`Template loaded: ${title} - ${category}`);
      
      // Set the prompt in the form data
      setFormData(prev => ({
        ...prev,
        prompt,
        promptTemplate: prompt,
        buildCustom: true,
        useTemplate: false,
        defaultEditorTab: openInAdvancedEditor ? "advanced" : "basic",
        title: title || "",
        category: category || "",
        description: description || ""
      }));
      
      setLoadedFromLibrary(true);
      
      // If category is available, try to set the task type and subcategory
      if (category) {
        const categoryToTaskMap: Record<string, TaskType> = {
          "Content": "content",
          "Code": "code", 
          "Marketing": "content",
          "Business": "idea",
          "Data": "content"
        };
        
        const taskType = categoryToTaskMap[category] || "content";
        setSelectedTask(taskType);
        
        const subCategories = SUBCATEGORIES[taskType];
        if (subCategories && subCategories.length > 0) {
          setSelectedSubCategory(subCategories[0].id);
        }
      }
      
      toast({
        title: "Template loaded",
        description: `"${title}" template loaded in the editor.`,
        duration: 3000
      });
    };
    
    document.addEventListener("loadTemplate", handleLoadTemplate as EventListener);
    
    return () => {
      document.removeEventListener("loadTemplate", handleLoadTemplate as EventListener);
    };
  }, [toast]);

  // Update formData when subcategory changes, but don't overwrite loaded template
  useEffect(() => {
    if (selectedTask && selectedSubCategory && !formData.buildCustom && !loadedFromLibrary) {
      const defaultPrompt = getDefaultPrompt(selectedTask, selectedSubCategory);
      // Development logging only
      if (process.env.NODE_ENV === 'development') {
        console.log("Setting default prompt from subcategory change:", defaultPrompt);
      }

      setFormData(prev => ({
        ...prev,
        promptTemplate: defaultPrompt,
        prompt: defaultPrompt,
        useTemplate: true,
        buildCustom: false,
        detailLevel: prev.detailLevel || 2,
        tone: prev.tone || "professional",
        includeExamples: prev.includeExamples !== undefined ? prev.includeExamples : false
      }));
    } else if (loadedFromLibrary) {
      // Development logging only
      if (process.env.NODE_ENV === 'development') {
        console.log("Not setting default prompt because loadedFromLibrary is true");
      }
      setDebugInfo(prev => prev + "\nPreserving template data - not overwriting with subcategory defaults");
    }
  }, [selectedTask, selectedSubCategory, formData.buildCustom, loadedFromLibrary]);

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTaskSelection = (task: TaskType) => {
    setSelectedTask(task);
    setSelectedSubCategory(null);
  };

  const handleSubCategorySelection = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };

  const savePromptToHistory = (prompt: string) => {
    if (!user) return;

    const currentPrompts = localStorage.getItem(`${user.id}_recent_prompts`);
    let promptsArray: string[] = [];
    if (currentPrompts) {
      try {
        promptsArray = JSON.parse(currentPrompts);
      } catch (e) {
        promptsArray = [];
      }
    }

    promptsArray = [prompt, ...promptsArray.filter(p => p !== prompt)].slice(0, 10);
    localStorage.setItem(`${user.id}_recent_prompts`, JSON.stringify(promptsArray));
    setRecentPrompts(promptsArray.slice(0, 3));
  };

  const handleGenerate = () => {
    if (!canGenerate) {
      return;
    }
    if (user && promptsRemaining !== null && promptsRemaining <= 0) {
      return;
    }

    setIsEnhancing(true);
    
    setTimeout(() => {
      const enhancedPrompt = generateEnhancedPrompt();
      setGeneratedPrompt(enhancedPrompt);
      setIsEnhancing(false);
      
      savePromptToHistory(enhancedPrompt);
  
      if (user && promptsRemaining !== null) {
        const newPromptsRemaining = promptsRemaining - 1;
        setPromptsRemaining(newPromptsRemaining);
  
        const updatedUser = {
          ...user,
          promptsRemaining: newPromptsRemaining
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }, 1500);
  };

  const generateEnhancedPrompt = () => {
    let basePrompt = formData.prompt || "";
    
    basePrompt = basePrompt
      .replace(/\[topic\]/g, formData.topic || "the selected topic")
      .replace(/\[key points\]/g, formData.keyPoints || "important aspects")
      .replace(/\[language\]/g, formData.language || "the specified programming language")
      .replace(/\[functionality\]/g, formData.functionality || "the requested functionality")
      .replace(/\[challenge\]/g, formData.challenge || "the problem")
      .replace(/\[context\]/g, formData.context || "relevant background information")
      .replace(/\[constraints\]/g, formData.constraints || "any limitations");
    
    let enhancedPrompt = basePrompt;
    
    const shouldAddStructure = formData.useTemplate || 
                              (!formData.buildCustom && basePrompt.length < 100) || 
                              (formData.buildCustom && basePrompt.length < 50);
    
    if (shouldAddStructure) {
      switch (selectedTask) {
        case "content":
          enhancedPrompt += `\n\n#Response Guidelines:\n\n1. Writing Style: Use a ${formData.tone || "professional"} tone throughout the content.`;
          
          if (formData.targetAudience) {
            enhancedPrompt += `\n2. Target Audience: Craft content specifically for ${formData.targetAudience}.`;
          }
          
          enhancedPrompt += `\n3. Structure: Include an engaging introduction that outlines the main points, well-organized body sections with clear headings, and a concise conclusion.`;
          
          if (formData.includeExamples) {
            enhancedPrompt += "\n4. Examples: Incorporate relevant examples that illustrate key concepts.";
          }
          
          enhancedPrompt += `\n5. Detail Level: ${getDetailLevelDescription(formData.detailLevel || 2)}`;
          break;
          
        case "code":
          enhancedPrompt += `\n\n#Code Guidelines:\n\n1. Language: Write code in ${formData.language || "the specified language"}.`;
          
          if (formData.includeComments) {
            enhancedPrompt += "\n2. Documentation: Include thorough comments explaining the approach, logic, and any important decisions.";
          }
          
          if (formData.optimizePerformance) {
            enhancedPrompt += "\n3. Performance: Optimize for efficiency and performance.";
          }
          
          enhancedPrompt += "\n4. Structure: Ensure code is well-organized, modular, and follows best practices.";
          
          if (formData.includeExamples) {
            enhancedPrompt += "\n5. Usage: Include usage examples showing how to implement the code.";
          }
          
          enhancedPrompt += `\n6. Detail Level: ${getDetailLevelDescription(formData.detailLevel || 2)}`;
          break;
          
        case "idea":
          enhancedPrompt += `\n\n#Ideation Guidelines:\n\n1. Approach: Consider both conventional and innovative solutions.`;
          
          if (formData.constraints) {
            enhancedPrompt += `\n2. Constraints: Work within these limitations: ${formData.constraints}.`;
          }
          
          enhancedPrompt += "\n3. Structure: Present ideas with clear rationales and potential implementation approaches.";
          
          if (formData.includeExamples) {
            enhancedPrompt += "\n4. Examples: Include examples of where similar approaches have succeeded.";
          }
          
          enhancedPrompt += `\n5. Detail Level: ${getDetailLevelDescription(formData.detailLevel || 2)}`;
          break;
          
        case "image":
          enhancedPrompt += `\n\n#Image Generation Guidelines:\n\n1. Style: Create imagery using ${formData.style || "the appropriate"} style.`;
          
          if (formData.details) {
            enhancedPrompt += `\n2. Elements: Include these specific visual elements: ${formData.details}.`;
          }
          
          enhancedPrompt += "\n3. Composition: Pay attention to balance, focal points, and visual flow.";
          
          if (formData.includeExamples) {
            enhancedPrompt += "\n4. References: Use reference images or styles as inspiration where appropriate.";
          }
          
          enhancedPrompt += `\n5. Detail Level: ${getDetailLevelDescription(formData.detailLevel || 2)}`;
          break;
          
        default:
          enhancedPrompt += `\n\n#Response Guidelines:\n\n1. Tone: Maintain a ${formData.tone || "professional"} tone.`;
          enhancedPrompt += "\n2. Structure: Organize the response with clear sections and logical flow.";
          
          if (formData.includeExamples) {
            enhancedPrompt += "\n3. Examples: Include relevant examples to illustrate key points.";
          }
          
          enhancedPrompt += `\n4. Detail Level: ${getDetailLevelDescription(formData.detailLevel || 2)}`;
      }

      if (user && user.subscription === "premium") {
        enhancedPrompt += "\n\n#Premium Enhancements:";
        enhancedPrompt += "\n1. Strategic Insights: Include advanced perspectives and analysis beyond surface-level thinking.";
        enhancedPrompt += "\n2. Efficiency Optimization: Structure the response for maximum clarity and practical usefulness.";
        enhancedPrompt += "\n3. Actionable Framework: Provide a clear framework for implementing the advice or information.";
      }
    }
    
    return enhancedPrompt;
  };

  const getDetailLevelDescription = (level: number) => {
    switch (level) {
      case 1: 
        return "Provide a concise overview with essential information only.";
      case 2: 
        return "Include moderate detail with balanced explanations of key concepts.";
      case 3: 
        return "Deliver comprehensive coverage with thorough explanations and nuanced insights.";
      default: 
        return "Provide a balanced level of detail.";
    }
  };

  const copyToClipboard = () => {
    // Validate placeholders before copying
    const placeholders = extractPlaceholders(generatedPrompt);
    const missingFields: string[] = [];
    
    placeholders.forEach(placeholder => {
      if (!formData[placeholder] || formData[placeholder].toString().trim() === '') {
        missingFields.push(placeholder);
      }
    });
    
    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: `Missing required fields: ${missingFields.join(', ')}`,
        variant: "destructive",
        duration: 5000
      });
      return;
    }
    
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Your enhanced prompt has been copied to your clipboard.",
        duration: 3000
      });
    }, err => {
      // Log errors appropriately based on environment
      if (process.env.NODE_ENV === 'development') {
        console.error("Could not copy text: ", err);
      }
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                <Lightbulb className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Prompt Builder</h1>
            </div>
            
            <TaskSelector 
              selectedTask={selectedTask} 
              onTaskSelect={handleTaskSelection} 
            />
          </div>

          {/* Status and Actions */}
          <div className="p-6 space-y-4">
            {loadedFromLibrary && (
              <div className="bg-emerald-50 text-emerald-700 px-3 py-2 text-sm rounded-lg inline-flex items-center border border-emerald-200">
                <CheckCircle className="h-4 w-4 mr-2" /> 
                Template loaded successfully
              </div>
            )}
            
            {user && promptsRemaining !== null && (
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="font-medium text-gray-700 mb-2">
                  {user.subscription === "premium" ? 
                    <span className="flex items-center text-amber-600">
                      <Star className="h-4 w-4 mr-1" />
                      Premium: Unlimited Prompts
                    </span> 
                    : 
                    <span className="text-gray-900">Prompts remaining: <span className="font-bold text-purple-600">{promptsRemaining}</span></span>
                  }
                </div>
                {user.subscription !== "premium" && 
                  <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50 text-purple-600 w-full" asChild>
                    <a href="/pricing">Upgrade for unlimited</a>
                  </Button>
                }
              </div>
            )}

            {!user && (
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
                <h3 className="font-semibold mb-2 text-gray-900 text-sm">Get Started Free</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Sign up for free to save your prompts and get 5 enhanced prompts per month.
                </p>
                <div className="space-y-2">
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs w-full" asChild>
                    <a href="/signup">Sign Up Free</a>
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 text-xs w-full" asChild>
                    <a href="/signin">Sign In</a>
                  </Button>
                </div>
              </div>
            )}

            {recentPrompts.length > 0 && (
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  Recent Prompts
                </h3>
                <div className="space-y-2">
                  {recentPrompts.map((prompt, index) => 
                    <div key={index} 
                      onClick={() => {
                        navigator.clipboard.writeText(prompt);
                        toast({
                          title: "Copied to clipboard",
                          duration: 2000
                        });
                      }} 
                      className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-700 cursor-pointer transition-colors flex justify-between items-center"
                    >
                      <span className="truncate font-medium">{prompt.substring(0, 50)}...</span>
                      <Copy className="h-3 w-3 text-gray-400 flex-shrink-0" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-0">
            {/* Form Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col min-h-0">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Customize Your Prompt</h2>
                  </div>
                  {selectedTask && selectedSubCategory && (
                    <Button 
                      onClick={handleGenerate} 
                      disabled={isEnhancing || !canGenerate || (user && promptsRemaining !== null && promptsRemaining <= 0)} 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
                      size="lg"
                    >
                      {isEnhancing ? (
                        <>Enhancing<span className="ml-2 animate-pulse">...</span></>
                      ) : (
                        <><Sparkle className="mr-2 h-5 w-5" />Enhance with AI</>
                      )}
                    </Button>
                  )}
                </div>
                
                {/* Subcategory Selection at the top */}
                {selectedTask && SUBCATEGORIES[selectedTask] && SUBCATEGORIES[selectedTask].length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">Select specific type:</h4>
                    <select 
                      value={selectedSubCategory || ""} 
                      onChange={(e) => handleSubCategorySelection(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Choose a specific type...</option>
                      {SUBCATEGORIES[selectedTask].map((subCat) => (
                        <option key={subCat.id} value={subCat.id}>
                          {subCat.name} - {subCat.description}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto min-h-0">
                {selectedTask && selectedSubCategory ? (
                  <div className="space-y-6">
                    <PromptForm 
                      taskType={selectedTask} 
                      subCategory={selectedSubCategory} 
                      formData={formData} 
                      onChange={handleFormChange} 
                    />
                    
                    {user && promptsRemaining !== null && promptsRemaining <= 0 && (
                      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg flex items-start">
                        <AlertCircle className="text-amber-500 mt-0.5 mr-3 h-5 w-5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-amber-800 font-medium mb-2">
                            You've used all your prompt enhancements for this month.
                          </p>
                          <UpgradePrompt currentTier={user.subscription || "free"} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-1 text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lightbulb className="h-8 w-8 text-purple-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Let's Get Started</h3>
                      <p className="text-gray-500">Choose a task type from the sidebar to begin building your prompt</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col min-h-0">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Live Preview</h2>
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto min-h-0">
                {generatedPrompt ? (
                  <Tabs defaultValue="prompt" className="w-full">
                    <TabsList className="mb-4 grid grid-cols-2 w-full">
                      <TabsTrigger value="prompt">Enhanced Prompt</TabsTrigger>
                      <TabsTrigger value="before-after">Before & After</TabsTrigger>
                    </TabsList>
                    <TabsContent value="prompt" className="w-full">
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-800">Your Enhanced Prompt</h3>
                          <Button 
                            onClick={copyToClipboard} 
                            size="sm"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                          >
                            <Copy className="mr-2 h-3 w-3" />
                            Copy
                          </Button>
                        </div>
                        <textarea 
                          readOnly 
                          value={generatedPrompt} 
                          className="min-h-[300px] w-full bg-white border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 whitespace-pre-line text-sm resize-none" 
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="before-after">
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                          <h3 className="font-medium mb-3 text-gray-800">Original Input</h3>
                          <div className="bg-white p-3 rounded border min-h-[120px] whitespace-pre-line">
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                              {formData.useTemplate ? formData.promptTemplate : formData.prompt}
                            </p>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-4">
                          <h3 className="font-medium mb-3 text-gray-800">AI-Enhanced Result</h3>
                          <div className="bg-white p-3 rounded border min-h-[120px] whitespace-pre-line">
                            <p className="text-sm text-gray-700 whitespace-pre-line">{generatedPrompt}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="flex items-center justify-center flex-1 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkle className="h-8 w-8 text-purple-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Ready for Enhancement</h3>
                      <p className="text-gray-500">Your AI-enhanced prompt will appear here once generated</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PromptBuilder;