
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, PencilLine, Zap } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Create Better AI Prompts in Minutes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our step-by-step approach helps you create detailed, effective
            prompts without needing to be an AI expert.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                AI-Powered Enhancement
              </h3>
              <p className="text-gray-600">
                Our system analyzes your inputs and automatically enhances them
                with specific details, context, and formatting that AI models
                respond to best.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <PencilLine className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Task-Specific Templates
              </h3>
              <p className="text-gray-600">
                Choose from various task types like content creation, coding,
                brainstorming, and more - each with customized fields for
                optimal results.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Consistent Results</h3>
              <p className="text-gray-600">
                Get predictably good outputs from AI tools by using our
                enhanced prompts that follow best practices for clarity and
                specificity.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
