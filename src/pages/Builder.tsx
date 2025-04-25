
import React from "react";
import Navbar from "@/components/layout/Navbar";
import PromptBuilder from "@/components/prompt-builder/PromptBuilder";

const Builder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI Prompt Builder
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create powerful, tailored prompts to get better results from any AI tool.
              Select your task, customize your requirements, and generate the perfect prompt.
            </p>
          </div>
        </div>
        <PromptBuilder />
      </div>
    </div>
  );
};

export default Builder;
