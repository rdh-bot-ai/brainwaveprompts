
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  BrainCircuit,
  Zap,
  User,
  Code,
  Lightbulb,
  MessageSquare,
  RefreshCw,
  PencilLine,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                <span className="block">Get More From AI</span>
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  With Better Prompts
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Create powerful AI prompts without being an expert. Turn simple
                ideas into detailed, effective prompts that generate better
                results every time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="rounded-full">
                  <Link to="/builder">Start Building Prompts</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="rounded-full"
                >
                  <Link to="/pricing">View Plans</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white p-2 rounded-xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1675452454882-5e6c867146f8?q=80&w=1074&auto=format&fit=crop"
                  alt="AI Prompt Builder"
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
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

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our three-step process makes creating effective AI prompts simple
              and intuitive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-full bg-purple-600 w-16 h-16 flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Select Your Task</h3>
              <p className="text-gray-600">
                Choose from content creation, code generation, brainstorming, and
                more.
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-purple-600 w-16 h-16 flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Add Details</h3>
              <p className="text-gray-600">
                Fill in the task-specific form with your requirements, tone,
                context, and constraints.
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-purple-600 w-16 h-16 flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Get Enhanced Prompt</h3>
              <p className="text-gray-600">
                Our AI enhances your input into a detailed, optimized prompt
                ready to use with any AI tool.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="rounded-full">
              <Link to="/builder">
                Try It Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Powerful Prompts for Any Task
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI Prompt Builder helps with a wide range of use cases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mr-3">
                    <PencilLine className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold">Content Creation</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Create detailed prompts for blog posts, articles, social media
                  content, and more with specific tone and style guidance.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mr-3">
                    <Code className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold">Code Generation</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Get better code snippets by creating prompts with detailed
                  functionality descriptions, sample inputs, and constraints.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mr-3">
                    <Lightbulb className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold">Idea Generation</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Craft prompts that yield creative, relevant ideas for business
                  strategies, product concepts, or creative projects.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mr-3">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold">Conversational AI</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Design better chat prompts with personality, context, and
                  specific instructions for more helpful AI assistants.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold">Expert Guidance</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Create prompts that turn AI into a subject matter expert for
                  research, analysis, or learning in any field.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mr-3">
                    <RefreshCw className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold">Content Transformation</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Build prompts to effectively rewrite, summarize, expand, or
                  translate content with specific parameters.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section Teaser */}
      <section className="py-16 px-4 bg-purple-50">
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

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Prompt Builder</h3>
              <p className="text-sm text-gray-400">
                Create enhanced prompts for better AI interactions.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/builder" className="hover:text-white">
                    Prompt Builder
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-white">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Account</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/signin" className="hover:text-white">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-white">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-400">
            <p>© 2023 AI Prompt Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
