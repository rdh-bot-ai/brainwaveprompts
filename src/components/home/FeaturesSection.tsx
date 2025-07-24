
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, PencilLine, Zap } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Talk to AI Like a Pro in Minutes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't know how to "talk" to AI? We'll guide you step-by-step to create clear instructions that get you exactly what you want from any AI tool.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Beginner-Friendly Guide
              </h3>
              <p className="text-gray-600">
                Never used AI before? We translate your simple ideas into the detailed instructions that AI needs to give you great results every time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <PencilLine className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Easy Templates for Everything
              </h3>
              <p className="text-gray-600">
                Choose what you want to create - write emails, plan projects, get ideas, or solve problems. We have simple forms for each task that anyone can fill out.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Always Get Good Results</h3>
              <p className="text-gray-600">
                Stop getting confusing or unhelpful responses from AI. Our prompts ensure you get useful, relevant answers that actually help you accomplish your goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
