
import React from "react";
import {
  PenLine,
  Briefcase,
  Building,
  Code,
  Palette
} from "lucide-react";

type UserType = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const WhoIsItForSection = () => {
  const userTypes: UserType[] = [
    {
      icon: <PenLine className="h-8 w-8 text-purple-600" />,
      title: "Content Creators",
      description: "Generate more engaging blog posts, scripts, and social media captions with AI-optimized prompts."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-purple-600" />,
      title: "Small Business",
      description: "Create effective marketing copy, email campaigns, and product descriptions to grow your business."
    },
    {
      icon: <Building className="h-8 w-8 text-purple-600" />,
      title: "Corporate Users",
      description: "Draft professional documents, reports, and communications that align with your brand voice."
    },
    {
      icon: <PenLine className="h-8 w-8 text-purple-600" />,
      title: "Freelancers",
      description: "Deliver higher quality work faster with prompts tailored to meet your clients' specific needs."
    },
    {
      icon: <Code className="h-8 w-8 text-purple-600" />,
      title: "Developers",
      description: "Write better code, design APIs, and create documentation with structured technical prompts."
    },
    {
      icon: <Palette className="h-8 w-8 text-purple-600" />,
      title: "Designers",
      description: "Generate creative concepts, describe design elements precisely, and iterate more effectively."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Who Is It For</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI Prompt Builder serves a wide variety of professionals and creatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all text-center"
            >
              <div className="rounded-full bg-purple-100 p-4 mb-4">
                {userType.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{userType.title}</h3>
              <p className="text-gray-600">{userType.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsItForSection;
