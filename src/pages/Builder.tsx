import React from "react";
import Navbar from "@/components/layout/Navbar";
import PromptBuilder from "@/components/prompt-builder/PromptBuilder";
const Builder = () => {
  return <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Brainwave Prompt Builder</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Create detailed, effective prompts tailored to your specific needs. Our templates include 
              clearly formatted, step-by-step instructions with numbered points for maximum clarity and readability. 
              Simply select a use case, customize the details, and let our AI enhance your prompt for better results.
            </p>
          </div>
        </div>
        <PromptBuilder />
      </div>
    </div>;
};
export default Builder;