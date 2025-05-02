
import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import UseCasesSection from "@/components/home/UseCasesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WhoIsItForSection from "@/components/home/WhoIsItForSection";
import PricingSection from "@/components/home/PricingSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <UseCasesSection />
      <HowItWorksSection />
      <WhoIsItForSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
