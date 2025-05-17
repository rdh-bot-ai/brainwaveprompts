
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import PromptBuilder from "@/components/prompt-builder/PromptBuilder";

const Builder = () => {
  // Effect to handle any template that should be loaded from the prompt library
  useEffect(() => {
    // Check if there's a template to load
    const templatePrompt = sessionStorage.getItem("templatePrompt");
    const openInAdvancedEditor = sessionStorage.getItem("openInAdvancedEditor");
    const templateTitle = sessionStorage.getItem("templateTitle");
    const templateCategory = sessionStorage.getItem("templateCategory");
    const templateDescription = sessionStorage.getItem("templateDescription");
    
    if (templatePrompt) {
      console.log("Builder page loading template:", { 
        templatePrompt, 
        openInAdvancedEditor, 
        templateTitle, 
        templateCategory,
        templateDescription 
      });
      
      // Create a custom event to signal to the PromptBuilder component
      const event = new CustomEvent("loadTemplate", { 
        detail: { 
          prompt: templatePrompt,
          openInAdvancedEditor: openInAdvancedEditor === "true",
          title: templateTitle || "",
          category: templateCategory || "",
          description: templateDescription || ""
        } 
      });
      document.dispatchEvent(event);
      
      // Clear the stored data after it's been used
      sessionStorage.removeItem("templatePrompt");
      sessionStorage.removeItem("openInAdvancedEditor");
      sessionStorage.removeItem("templateTitle");
      sessionStorage.removeItem("templateCategory");
      sessionStorage.removeItem("templateDescription");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">AI Prompt Builder</h1>
            <p className="mt-2 text-xl text-gray-600">Create professional prompts for any AI task</p>
          </div>
        </div>
        <PromptBuilder />
      </div>
    </div>
  );
};

export default Builder;
