import React, { useState, useContext, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Sparkle, Clipboard, ArrowRight, Lightbulb, MessageCircle, CheckCircle, Copy, Star, Clock } from "lucide-react";
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
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [canGenerate, setCanGenerate] = useState<boolean>(true);
  const [promptsRemaining, setPromptsRemaining] = useState<number | null>(null);
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);
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

    // Generate the enhanced prompt
    const enhancedPrompt = generateEnhancedPrompt();
    setGeneratedPrompt(enhancedPrompt);
    setCurrentStep(3);

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
  };
  const generateEnhancedPrompt = () => {
    // This simulates using AI to enhance the basic prompt with comprehensive details
    
    let basicPrompt = formData.prompt || "";
    // Get the full template that was stored when user selected the subcategory
    let fullTemplate = formData.promptTemplate || "";
    
    // First, ensure all placeholders are replaced in the full template
    if (selectedTask === "content" && formData.topic) {
      fullTemplate = fullTemplate.replace(/\[topic\]/g, formData.topic);
    }
    if (formData.keyPoints) {
      fullTemplate = fullTemplate.replace(/\[key points\]/g, formData.keyPoints);
    }
    if (selectedTask === "code" && formData.language) {
      fullTemplate = fullTemplate.replace(/\[language\]/g, formData.language);
    }
    if (selectedTask === "code" && formData.functionality) {
      fullTemplate = fullTemplate.replace(/\[functionality\]/g, formData.functionality);
    }
    if (selectedTask === "idea" && formData.challenge) {
      fullTemplate = fullTemplate.replace(/\[challenge\]/g, formData.challenge);
    }
    if (formData.context) {
      fullTemplate = fullTemplate.replace(/\[context\]/g, formData.context);
    }
    if (formData.constraints) {
      fullTemplate = fullTemplate.replace(/\[constraints\]/g, formData.constraints);
    }

    // Use the full template as the base for the enhanced prompt
    let enhancedPrompt = fullTemplate;

    // Add task-specific enhancements beyond what's in the template
    switch (selectedTask) {
      case "content":
        enhancedPrompt += "\n\n## Additional Content Requirements:\n\n";
        enhancedPrompt += "1) Create an engaging introduction that establishes relevance and hooks the reader\n\n";
        enhancedPrompt += "2) Include data points, statistics, or research to support key arguments\n\n";
        enhancedPrompt += "3) Use illustrative examples or case studies where appropriate\n\n";
        enhancedPrompt += "4) Maintain a consistent voice and tone throughout the content\n\n";
        enhancedPrompt += "5) Conclude with actionable takeaways or next steps for the reader";
        break;
      case "code":
        enhancedPrompt += "\n\n## Additional Code Requirements:\n\n";
        enhancedPrompt += "1) Include comprehensive error handling for edge cases\n\n";
        enhancedPrompt += "2) Add detailed comments explaining the logic behind complex operations\n\n";
        enhancedPrompt += "3) Optimize for performance and readability\n\n";
        enhancedPrompt += "4) Follow best practices specific to the language and framework\n\n";
        enhancedPrompt += "5) Include usage examples demonstrating common scenarios";
        break;
      case "idea":
        enhancedPrompt += "\n\n## Idea Generation Guidelines:\n\n";
        enhancedPrompt += "1) Include both conventional and unconventional approaches\n\n";
        enhancedPrompt += "2) Consider short-term quick wins and long-term strategic solutions\n\n";
        enhancedPrompt += "3) Evaluate feasibility, impact, and resource requirements for each idea\n\n";
        enhancedPrompt += "4) Address potential obstacles and how to overcome them\n\n";
        enhancedPrompt += "5) Suggest metrics to measure success of implementation";
        break;
      case "image":
        enhancedPrompt += "\n\n## Image Creation Guidelines:\n\n";
        enhancedPrompt += "1) Specify composition elements including foreground, middle ground, and background\n\n";
        enhancedPrompt += "2) Define lighting direction, quality, and atmosphere\n\n";
        enhancedPrompt += "3) Include color palette suggestions with emotional impact\n\n";
        enhancedPrompt += "4) Suggest camera perspective and focal length effects\n\n";
        enhancedPrompt += "5) Specify style references from notable artists or genres if applicable";
        break;
      default:
        // For other categories, add general enhancements
        enhancedPrompt += "\n\n## Enhancement Guidelines:\n\n";
        enhancedPrompt += "1) Make the content comprehensive and detailed\n\n";
        enhancedPrompt += "2) Structure with clear sections and logical flow\n\n";
        enhancedPrompt += "3) Ensure practical applicability and actionable insights\n\n";
        enhancedPrompt += "4) Include supporting evidence or examples\n\n";
        enhancedPrompt += "5) Tailor specifically to the intended audience and purpose";
    }

    // Add tone if specified
    if (formData.tone) {
      enhancedPrompt += `\n\n## Tone and Style:\nUse a ${formData.tone} tone throughout the response.`;
    }

    // Add additional context if provided
    if (formData.additionalContext) {
      enhancedPrompt += `\n\n## Additional Context:\n${formData.additionalContext}`;
    }

    // Add examples request if enabled
    if (formData.includeExamples) {
      enhancedPrompt += "\n\n## Examples:\nInclude multiple concrete examples to illustrate key points and applications.";
    }

    // Add detail level instructions
    const detailLevelMap = {
      1: "Provide a brief and concise response focusing only on the most essential information.",
      2: "Provide a moderately detailed response with balanced explanations of key concepts.",
      3: "Provide a comprehensive, highly detailed response with thorough explanations and nuanced insights."
    };
    enhancedPrompt += `\n\n## Detail Level:\n${detailLevelMap[formData.detailLevel || 2]}`;

    // Add premium features for premium users
    if (user && user.subscription === "premium") {
      enhancedPrompt += "\n\n## Premium Enhancements:\n";
      enhancedPrompt += "• Include strategic insights and advanced considerations that wouldn't be obvious to beginners\n";
      enhancedPrompt += "• Optimize this response for maximum clarity, practical usefulness, and actionable next steps\n";
      enhancedPrompt += "• Provide exclusive content variations or advanced applications";
    }
    
    return enhancedPrompt;
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
              Step 2: Provide Details
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
                disabled={!canGenerate || (user && promptsRemaining !== null && promptsRemaining <= 0)} 
                className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Sparkle className="mr-2 h-4 w-4" />
                Generate Enhanced Prompt
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
              Your Enhanced Prompt
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
                    <h3 className="font-medium mb-2 text-gray-700">Original Template</h3>
                    <div className="p-3 bg-gray-100 rounded-md min-h-[200px] whitespace-pre-line">
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        {formData.prompt || `${selectedTask}: ${formData.topic || formData.challenge || formData.functionality || "Your prompt"}`}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700">Enhanced Prompt</h3>
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
