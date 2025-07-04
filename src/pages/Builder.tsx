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

      // Add a slight delay to ensure the PromptBuilder component is mounted
      setTimeout(() => {
        document.dispatchEvent(event);
        console.log("Dispatched loadTemplate event");

        // Clear the stored data after it's been used
        sessionStorage.removeItem("templatePrompt");
        sessionStorage.removeItem("openInAdvancedEditor");
        sessionStorage.removeItem("templateTitle");
        sessionStorage.removeItem("templateCategory");
        sessionStorage.removeItem("templateDescription");
      }, 100);
    }
  }, []);
  return <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      <div className="pt-20 pb-8">
        <PromptBuilder />
      </div>
    </div>;
};
export default Builder;