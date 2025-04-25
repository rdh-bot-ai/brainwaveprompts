
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Start Creating Better AI Prompts Today
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of users who get better, more consistent results from
          AI with our prompt builder.
        </p>
        <Button
          size="lg"
          variant="secondary"
          asChild
          className="rounded-full bg-white text-purple-700 hover:bg-gray-100"
        >
          <Link to="/builder">
            Try It Free <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
