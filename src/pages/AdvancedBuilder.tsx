import React from "react";
import Navbar from "@/components/layout/Navbar";
import AdvancedPromptBuilder from "@/components/advanced-prompt-builder/AdvancedPromptBuilder";

const AdvancedBuilder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />
      <div className="container mx-auto py-8">
        <AdvancedPromptBuilder />
      </div>
    </div>
  );
};

export default AdvancedBuilder;