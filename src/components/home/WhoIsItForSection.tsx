
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
      title: "Complete AI Beginners",
      description: "Never used ChatGPT or any AI? Perfect! Start here and learn how to get great results from your first try."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-purple-600" />,
      title: "Small Business Owners",
      description: "Get help writing emails, creating content, and solving business problems without learning complex AI skills."
    },
    {
      icon: <Building className="h-8 w-8 text-purple-600" />,
      title: "Office Workers",
      description: "Make your daily tasks easier - from writing reports to brainstorming ideas, AI can help with almost anything."
    },
    {
      icon: <PenLine className="h-8 w-8 text-purple-600" />,
      title: "Students & Learners",
      description: "Get help with research, writing, and understanding complex topics. Learn how to use AI as your study buddy."
    },
    {
      icon: <Code className="h-8 w-8 text-purple-600" />,
      title: "Creative Professionals",
      description: "Writers, designers, and creators who want to use AI for inspiration and productivity without the technical hassle."
    },
    {
      icon: <Palette className="h-8 w-8 text-purple-600" />,
      title: "Anyone Curious About AI",
      description: "If you've heard about AI but don't know where to start, this is your simple, friendly introduction."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Perfect for AI Newcomers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you've never used AI before or just want better results, we make it simple for everyone.
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
