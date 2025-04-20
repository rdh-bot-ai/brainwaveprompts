
import React from "react";
import Navbar from "@/components/layout/Navbar";
import PromptBuilder from "@/components/prompt-builder/PromptBuilder";

const Builder = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <PromptBuilder />
      </div>
    </div>
  );
};

export default Builder;
