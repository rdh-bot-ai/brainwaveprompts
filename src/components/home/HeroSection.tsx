import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
  return <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              <span className="block">New to AI?</span>
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Start Here & Get Amazing Results</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Never used ChatGPT or AI before? No problem! Our simple tool helps you communicate with AI clearly so you get exactly what you need - no technical knowledge required.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="rounded-full">
                <Link to="/builder">Start Building Prompts</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-full">
                <Link to="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white p-2 rounded-xl shadow-xl">
              <img src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop`} alt="AI Prompt Engineering" className="rounded-lg w-full object-cover aspect-video" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;