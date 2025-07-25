import React from "react";
import Navbar from "@/components/layout/Navbar";
import DynamicPromptBuilder from "@/components/dynamic-fields/DynamicPromptBuilder";

const DynamicBuilder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Dynamic Prompt Builder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced prompt building with automatic placeholder validation and dynamic field generation.
          </p>
        </div>
        <DynamicPromptBuilder />
      </div>
    </div>
  );
};

export default DynamicBuilder;