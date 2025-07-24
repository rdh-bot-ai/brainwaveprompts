import React from "react";
import Navbar from "@/components/layout/Navbar";
import PricingTiers from "@/components/subscription/PricingTiers";
const Pricing = () => {
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              <span className="block">Simple, Transparent Pricing</span>
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Choose the plan that's right for you and start creating more effective AI prompts.
            </p>
          </div>

          <PricingTiers />

          
        </div>
      </div>
    </div>;
};
export default Pricing;