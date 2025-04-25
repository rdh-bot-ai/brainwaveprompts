
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PencilLine, Code, Sparkles, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/80 via-white to-white"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into powerful AI prompts in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none">
            <div className="relative h-0.5 w-full">
              {/* First connecting line */}
              <div 
                className="absolute left-[20%] right-[50%] h-1 rounded-full bg-gradient-to-r from-purple-200 via-purple-400 to-purple-500"
                style={{ 
                  transform: 'translateY(-1rem) rotate(-2deg)',
                  filter: 'blur(0.5px)'
                }}
              />
              {/* Second connecting line */}
              <div 
                className="absolute left-[50%] right-[20%] h-1 rounded-full bg-gradient-to-r from-purple-500 via-purple-400 to-purple-200"
                style={{ 
                  transform: 'translateY(1rem) rotate(2deg)',
                  filter: 'blur(0.5px)'
                }}
              />
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

        <div className="text-center mt-20">
          <Button 
            size="lg" 
            asChild 
            className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
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
    <div className="relative z-10 group">
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          {/* Animated background blur effect */}
          <div className="absolute -inset-4 bg-purple-100/50 rounded-full blur-2xl transition-all duration-500 group-hover:bg-purple-200/50" />
          
          {/* Number circle */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 shadow-lg">
              <span className="text-3xl font-bold text-white">{number}</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-200 animate-pulse opacity-70" />
          </div>
        </div>
        
        <div className="relative space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
            {description}
          </p>
          <div className="mt-6">
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
