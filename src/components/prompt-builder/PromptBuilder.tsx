import React, { useState, useContext, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Sparkle, Copy, ArrowRight, Lightbulb, MessageCircle, CheckCircle, Clock, Star } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import TaskSelector from "./TaskSelector";
import PromptForm from "./PromptForm";
import { TaskType } from "./TaskIcons";
import UpgradePrompt from "../subscription/UpgradePrompt";
import { getDefaultPrompt } from "./subcategories";
import { useToast } from "@/hooks/use-toast";

const PromptBuilder: React.FC = () => {
  const {
    user
  } = useContext(AuthContext);
  const {
    toast
  } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({
    useTemplate: true, // Default to using templates
    buildCustom: false, // New state for building custom prompts
    detailLevel: 2,
    tone: "professional",
    includeExamples: false
  });
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [canGenerate, setCanGenerate] = useState<boolean>(true);
  const [promptsRemaining, setPromptsRemaining] = useState<number | null>(null);
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setPromptsRemaining(user.promptsRemaining || 0);

      // Load recent prompts from localStorage if user is logged in
      const savedPrompts = localStorage.getItem(`${user.id}_recent_prompts`);
      if (savedPrompts) {
        try {
          setRecentPrompts(JSON.parse(savedPrompts).slice(0, 3));
        } catch (e) {
          console.error("Error parsing saved prompts", e);
        }
      }
    }
  }, [user]);

  // Update formData when subcategory changes
  useEffect(() => {
    if (selectedTask && selectedSubCategory) {
      const defaultPrompt = getDefaultPrompt(selectedTask, selectedSubCategory);

      // Prefill the form with default values based on the subcategory
      setFormData(prev => ({
        ...prev,
        promptTemplate: defaultPrompt, // Store the original template
        prompt: defaultPrompt, // Current working prompt
        useTemplate: true, // Default to using templates
        buildCustom: false, // Ensure custom prompt mode is off by default
        detailLevel: prev.detailLevel || 2,
        tone: prev.tone || "professional",
        includeExamples: prev.includeExamples !== undefined ? prev.includeExamples : false
      }));
    }
  }, [selectedTask, selectedSubCategory]);
  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleNextStep = () => {
    if (currentStep === 1 && selectedTask) {
      setCurrentStep(2);
    }
  };
  const handlePrevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };
  const handleTaskSelection = (task: TaskType) => {
    setSelectedTask(task);
    setSelectedSubCategory(null); // Reset subcategory when task changes
  };
  const handleSubCategorySelection = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };
  const savePromptToHistory = (prompt: string) => {
    if (!user) return;

    // Save to local storage
    const currentPrompts = localStorage.getItem(`${user.id}_recent_prompts`);
    let promptsArray: string[] = [];
    if (currentPrompts) {
      try {
        promptsArray = JSON.parse(currentPrompts);
      } catch (e) {
        promptsArray = [];
      }
    }

    // Add to beginning, ensure unique, and limit to 10 items
    promptsArray = [prompt, ...promptsArray.filter(p => p !== prompt)].slice(0, 10);
    localStorage.setItem(`${user.id}_recent_prompts`, JSON.stringify(promptsArray));

    // Update state with most recent 3
    setRecentPrompts(promptsArray.slice(0, 3));
  };
  const handleGenerate = () => {
    // Check if user can generate prompts
    if (!canGenerate) {
      return;
    }
    if (user && promptsRemaining !== null && promptsRemaining <= 0) {
      // User has no prompts remaining
      return;
    }

    // Show enhancing state
    setIsEnhancing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Generate the enhanced prompt
      const enhancedPrompt = generateEnhancedPrompt();
      setGeneratedPrompt(enhancedPrompt);
      setCurrentStep(3);
      setIsEnhancing(false);
      
      // Save to history
      savePromptToHistory(enhancedPrompt);
  
      // Reduce the number of prompts remaining if user is authenticated
      if (user && promptsRemaining !== null) {
        const newPromptsRemaining = promptsRemaining - 1;
        setPromptsRemaining(newPromptsRemaining);
  
        // Mock updating the user in a real app this would call an API
        const updatedUser = {
          ...user,
          promptsRemaining: newPromptsRemaining
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }, 1500);
  };
  const generateEnhancedPrompt = () => {
    // Get base prompt (either template-based or custom)
    let basePrompt = formData.prompt || "";
    
    // Make sure all placeholders are replaced with appropriate default values
    basePrompt = basePrompt
      .replace(/\[topic\]/g, formData.topic || "the selected topic")
      .replace(/\[key points\]/g, formData.keyPoints || "important aspects")
      .replace(/\[language\]/g, formData.language || "the specified programming language")
      .replace(/\[functionality\]/g, formData.functionality || "the requested functionality")
      .replace(/\[challenge\]/g, formData.challenge || "the problem")
      .replace(/\[context\]/g, formData.context || "relevant background information")
      .replace(/\[constraints\]/g, formData.constraints || "any limitations");
    
    // Enhance the prompt based on task type
    let enhancedPrompt = basePrompt;
    
    // Only add additional context if using template, if the base prompt is short,
    // or if it's not specifically in buildCustom mode with a substantial prompt
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

      // Add premium features for premium users
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
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Your enhanced prompt has been copied to your clipboard.",
        duration: 3000
      });
    }, err => {
      console.error("Could not copy text: ", err);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    });
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-purple-500" />
              Step 1: Select Task Type
            </h2>
            <TaskSelector 
              selectedTask={selectedTask} 
              selectedSubCategory={selectedSubCategory} 
              onTaskSelect={handleTaskSelection} 
              onSubCategorySelect={handleSubCategorySelection} 
            />
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleNextStep} 
                disabled={!selectedTask || !selectedSubCategory} 
                className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-purple-500" />
              Step 2: Customize Your Prompt
            </h2>
            {selectedTask && selectedSubCategory && (
              <PromptForm 
                taskType={selectedTask} 
                subCategory={selectedSubCategory} 
                formData={formData} 
                onChange={handleFormChange} 
              />
            )}
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button 
                onClick={handleGenerate} 
                disabled={isEnhancing || !canGenerate || (user && promptsRemaining !== null && promptsRemaining <= 0)} 
                className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isEnhancing ? (
                  <>Enhancing<span className="ml-2 animate-pulse">...</span></>
                ) : (
                  <><Sparkle className="mr-2 h-4 w-4" />Enhance with AI</>
                )}
              </Button>
            </div>
            
            {user && promptsRemaining !== null && promptsRemaining <= 0 && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                <AlertCircle className="text-amber-500 mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-800">
                    You've used all your prompt enhancements for this month.
                  </p>
                  <UpgradePrompt currentTier={user.subscription || "free"} />
                </div>
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Your AI-Enhanced Prompt
            </h2>
            <Tabs defaultValue="prompt" className="w-full">
              <TabsList className="mb-4 grid grid-cols-2 w-full md:w-auto">
                <TabsTrigger value="prompt">Enhanced Prompt</TabsTrigger>
                <TabsTrigger value="before-after">Before & After</TabsTrigger>
              </TabsList>
              <TabsContent value="prompt" className="w-full">
                <Card className="p-4 bg-purple-50 border border-purple-200 shadow-sm">
                  <Textarea 
                    readOnly 
                    value={generatedPrompt} 
                    className="min-h-[300px] bg-white border-purple-100 focus-visible:ring-purple-500 whitespace-pre-line" 
                  />
                  <div className="mt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(2)} 
                      className="border-purple-200 hover:bg-purple-50"
                    >
                      Back to Editor
                    </Button>
                    <Button 
                      onClick={copyToClipboard} 
                      className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy to Clipboard
                    </Button>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="before-after">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700">Original Input</h3>
                    <div className="p-3 bg-gray-100 rounded-md min-h-[200px] whitespace-pre-line">
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        {formData.useTemplate ? formData.promptTemplate : formData.prompt}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700">AI-Enhanced Prompt</h3>
                    <div className="p-3 bg-purple-50 rounded-md min-h-[200px] border border-purple-100 whitespace-pre-line">
                      <p className="text-sm text-gray-700 whitespace-pre-line">{generatedPrompt}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
      default:
        return null;
    }
  };
  return <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8 flex justify-between items-center">
        <div className="space-y-1">
          
          
        </div>
        
        {user && promptsRemaining !== null && <div className="text-right">
            <div className="text-sm font-medium text-gray-700">
              {user.subscription === "premium" ? <span className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  Premium: Unlimited Prompts
                </span> : <span>Prompts remaining: {promptsRemaining}</span>}
            </div>
            {user.subscription !== "premium" && <Button variant="link" size="sm" className="text-purple-600 p-0" asChild>
                <a href="/pricing">Upgrade for more</a>
              </Button>}
          </div>}
      </div>

      {!user && <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-md shadow-sm">
          <h3 className="font-semibold mb-2 text-gray-800">Get More from AI Prompt Builder</h3>
          <p className="text-sm text-gray-700 mb-3">
            Sign up for free to save your prompts and get 5 enhanced prompts per month.
          </p>
          <div className="flex space-x-2">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700" asChild>
              <a href="/signup">Sign Up - Free</a>
            </Button>
            <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50" asChild>
              <a href="/signin">Sign In</a>
            </Button>
          </div>
        </div>}

      {recentPrompts.length > 0 && <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Recently Generated
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {recentPrompts.map((prompt, index) => <div key={index} onClick={() => {
          navigator.clipboard.writeText(prompt);
          toast({
            title: "Copied to clipboard",
            duration: 2000
          });
        }} className="p-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700 cursor-pointer hover:bg-gray-100 flex justify-between items-center truncate">
                <span className="truncate">{prompt.substring(0, 100)}...</span>
                <Copy className="h-3 w-3 text-gray-500 flex-shrink-0" />
              </div>)}
          </div>
        </div>}

      <Card className="p-6 shadow-sm border-purple-100">
        {renderStepContent()}
      </Card>
    </div>;
};
export default PromptBuilder;
