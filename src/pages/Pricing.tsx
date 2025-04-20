
import React from "react";
import Navbar from "@/components/layout/Navbar";
import PricingTiers from "@/components/subscription/PricingTiers";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
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

          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Compare Plans</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Free</th>
                    <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                    <th className="px-6 py-3 border-b text-center text-xs font-medium text-purple-600 uppercase tracking-wider">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Monthly Price</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">₹0</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">₹0</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-purple-600">₹750 ($10)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Prompt Enhancements</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">2 per month</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">5 per month</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-purple-600">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">AI Model</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">GPT-3.5-turbo</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">GPT-3.5-turbo</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-purple-600">GPT-4</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Prompt History</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">7 days</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">30 days</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-purple-600">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Template Access</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">✗</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Basic</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-purple-600">All + Premium</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Enhancement Level</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Up to 50%</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Up to 100%</td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-purple-600">Up to 200%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
