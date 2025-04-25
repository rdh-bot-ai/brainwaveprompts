
import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import UseCasesSection from "@/components/home/UseCasesSection";
import PricingSection from "@/components/home/PricingSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
