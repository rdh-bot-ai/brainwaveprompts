
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PencilLine, Code, Sparkles, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our three-step process makes creating effective AI prompts simple
            and intuitive.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none">
            <div className="relative h-0.5 w-full">
              {/* First connecting line */}
              <div className="absolute left-[25%] right-[50%] h-full bg-gradient-to-r from-purple-200 to-purple-400" 
                   style={{ transform: 'translateY(-2rem) rotate(-5deg)' }} />
              {/* Second connecting line */}
              <div className="absolute left-[50%] right-[25%] h-full bg-gradient-to-r from-purple-400 to-purple-200"
                   style={{ transform: 'translateY(2rem) rotate(5deg)' }} />
            </div>
          </div>

          <Step 
            number={1} 
            title="Select Your Task" 
            description="Choose from content creation, code generation, brainstorming, and more." 
            icon={<PencilLine className="w-8 h-8 text-purple-600" />} 
          />

          <Step 
            number={2} 
            title="Add Details" 
            description="Fill in the task-specific form with your requirements, tone, context, and constraints." 
            icon={<Code className="w-8 h-8 text-purple-600" />} 
          />

          <Step 
            number={3} 
            title="Get Enhanced Prompt" 
            description="Our AI enhances your input into a detailed, optimized prompt ready to use with any AI tool." 
            icon={<Sparkles className="w-8 h-8 text-purple-600" />} 
          />
        </div>

        <div className="text-center mt-16">
          <Button size="lg" asChild className="rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg transform transition-all hover:-translate-y-0.5">
            <Link to="/builder">
              Try It Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const Step = ({
  number,
  title,
  description,
  icon
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="relative z-10">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center transform transition-transform hover:scale-105 shadow-lg">
            <span className="text-2xl font-bold text-white">{number}</span>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-200 animate-pulse delay-150" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
        <div className="mt-4 flex justify-center">
          <div className="p-4 bg-purple-50 rounded-full">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
