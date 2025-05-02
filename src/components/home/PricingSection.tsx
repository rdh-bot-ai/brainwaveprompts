
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <Sparkles className="h-10 w-10 text-purple-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">
          Plans for Every AI User
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          From occasional users to AI power users, we have subscription plans
          to fit your needs and budget.
        </p>
        <Button size="lg" asChild className="rounded-full">
          <Link to="/pricing">View Pricing Plans</Link>
        </Button>
      </div>
    </section>
  );
};

export default PricingSection;
