import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Lightbulb, Target, Zap, CheckCircle, Users, Award, Clock } from "lucide-react";
const PromptConsulting = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    timeline: "",
    budget: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    // Mock form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        timeline: "",
        budget: "",
        description: ""
      });
      toast({
        title: "Success",
        description: "Your consultation request has been submitted. We'll get back to you within 24 hours."
      });
    }, 1000);
  };
  const services = [{
    icon: Lightbulb,
    title: "Custom Prompt Development",
    description: "Tailored prompts designed specifically for your business needs and use cases."
  }, {
    icon: Target,
    title: "Prompt Optimization",
    description: "Improve existing prompts for better accuracy, consistency, and performance."
  }, {
    icon: Zap,
    title: "AI Workflow Integration",
    description: "Seamlessly integrate custom prompts into your existing workflows and systems."
  }, {
    icon: Award,
    title: "Quality Assurance",
    description: "Rigorous testing and validation to ensure prompts meet your quality standards."
  }, {
    icon: Clock,
    title: "Ongoing Support",
    description: "Continuous monitoring, updates, and refinements to keep prompts performing optimally."
  }];
  const benefits = ["Save time with professionally crafted prompts", "Achieve more consistent and reliable AI outputs", "Optimize for your specific industry and use case", "Get expert guidance from professionals", "Reduce trial-and-error with proven methodologies", "Scale your AI initiatives with confidence"];
  return <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/30 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-[1.1] tracking-tight">
              Custom Prompt Consulting
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Transform your AI interactions with professionally crafted, custom prompts designed specifically for your business needs. Our expert team helps you unlock the full potential of AI for your unique use cases.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold min-w-[240px] shadow-lg hover:shadow-xl transition-all duration-300">
                <MessageCircle className="mr-3 h-6 w-6" />
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold min-w-[240px] border-2 hover:border-primary/50">
                <Users className="mr-3 h-6 w-6" />
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our Consulting Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We offer comprehensive prompt engineering services to help you achieve better results with AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-purple-100 dark:from-primary/20 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 lg:px-8 bg-gradient-to-br from-primary/5 via-purple-50/50 to-indigo-50/30 dark:from-primary/10 dark:via-purple-900/20 dark:to-indigo-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Why Choose Our Consulting?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the difference that professional prompt engineering can make
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => 
              <div key={index} className="flex items-start space-x-4 p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 border border-white/20">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                </div>
                <span className="text-lg text-foreground font-medium leading-relaxed">{benefit}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Tell us about your project and we'll provide a customized solution for your needs
            </p>
          </div>
          
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl font-bold text-center mb-4">Request a Consultation</CardTitle>
              <CardDescription className="text-center text-lg text-muted-foreground">
                Fill out the form below and our team will get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-base font-semibold">Full Name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="Your full name" 
                      required 
                      className="h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="your.email@company.com" 
                      required 
                      className="h-12 text-lg"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="company" className="text-base font-semibold">Company/Organization</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleInputChange} 
                      placeholder="Your company name" 
                      className="h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="projectType" className="text-base font-semibold">Project Type</Label>
                    <Input 
                      id="projectType" 
                      name="projectType" 
                      value={formData.projectType} 
                      onChange={handleInputChange} 
                      placeholder="e.g. Content Generation, Customer Support, etc." 
                      className="h-12 text-lg"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="timeline" className="text-base font-semibold">Desired Timeline</Label>
                    <Input 
                      id="timeline" 
                      name="timeline" 
                      value={formData.timeline} 
                      onChange={handleInputChange} 
                      placeholder="e.g. 2-3 weeks, ASAP, etc." 
                      className="h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="budget" className="text-base font-semibold">Budget Range</Label>
                    <Input 
                      id="budget" 
                      name="budget" 
                      value={formData.budget} 
                      onChange={handleInputChange} 
                      placeholder="e.g. $5,000-$10,000" 
                      className="h-12 text-lg"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-base font-semibold">Project Description *</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    placeholder="Please describe your project, goals, and specific requirements. Include any existing challenges you're facing with AI prompts." 
                    className="min-h-[140px] text-lg leading-relaxed" 
                    required 
                  />
                </div>
                
                <div className="text-center pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting} 
                    className="h-14 px-12 text-lg font-semibold min-w-[280px] shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>;
};
export default PromptConsulting;