
import React from "react";
import Navbar from "@/components/layout/Navbar";
import PromptBuilder from "@/components/prompt-builder/PromptBuilder";

const Builder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">AI Prompt Builder</h1>
            <p className="mt-3 text-xl text-gray-600">Create perfect prompts for any AI task</p>
          </div>
        </div>
        <PromptBuilder />
      </div>
    </div>
  );
};

export default Builder;
