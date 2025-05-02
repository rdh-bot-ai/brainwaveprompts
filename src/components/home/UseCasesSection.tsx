
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  PencilLine,
  Code,
  Lightbulb,
  MessageSquare,
  User,
  RefreshCw,
} from "lucide-react";

const UseCasesSection = () => {
  return (
    <section className="py-16 px-4 bg-purple-50">
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
          <UseCase
            icon={<PencilLine className="h-5 w-5 text-purple-600" />}
            title="Content Creation"
            description="Create detailed prompts for blog posts, articles, social media content, and more with specific tone and style guidance."
          />

          <UseCase
            icon={<Code className="h-5 w-5 text-purple-600" />}
            title="Code Generation"
            description="Get better code snippets by creating prompts with detailed functionality descriptions, sample inputs, and constraints."
          />

          <UseCase
            icon={<Lightbulb className="h-5 w-5 text-purple-600" />}
            title="Idea Generation"
            description="Craft prompts that yield creative, relevant ideas for business strategies, product concepts, or creative projects."
          />

          <UseCase
            icon={<MessageSquare className="h-5 w-5 text-purple-600" />}
            title="Conversational AI"
            description="Design better chat prompts with personality, context, and specific instructions for more helpful AI assistants."
          />

          <UseCase
            icon={<User className="h-5 w-5 text-purple-600" />}
            title="Expert Guidance"
            description="Create prompts that turn AI into a subject matter expert for research, analysis, or learning in any field."
          />

          <UseCase
            icon={<RefreshCw className="h-5 w-5 text-purple-600" />}
            title="Content Transformation"
            description="Build prompts to effectively rewrite, summarize, expand, or translate content with specific parameters."
          />
        </div>
      </div>
    </section>
  );
};

const UseCase = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
      <CardContent className="pt-6">
        <div className="flex items-start mb-4">
          <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mr-3">
            {icon}
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default UseCasesSection;
