
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1A1F2C] text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/a4fa3116-9da7-4898-a3e2-7acc1ff57e59.png" 
                alt="Brainwave Prompts" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-gray-400">
              Create enhanced prompts for better AI interactions.
            </p>
          </div>
          <FooterSection
            title="Product"
            links={[
              { to: "/builder", label: "Prompt Builder" },
              { to: "/templates", label: "Templates" },
              { to: "/pricing", label: "Pricing" },
            ]}
          />

          <FooterSection
            title="Account"
            links={[
              { to: "/signin", label: "Sign In" },
              { to: "/signup", label: "Sign Up" },
              { to: "/dashboard", label: "Dashboard" },
            ]}
          />

          <FooterSection
            title="Support"
            links={[
              { to: "#", label: "Help Center" },
              { to: "#", label: "Contact Us" },
              { to: "#", label: "Privacy Policy" },
              { to: "#", label: "Terms of Service" },
            ]}
          />
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-400">
          <p>© 2023 Brainwave Prompts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterSection = ({ title, links }: {
  title: string;
  links: Array<{ to: string; label: string }>;
}) => {
  return (
    <div>
      <h4 className="font-medium mb-4 text-white">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.to} className="text-gray-400 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
