import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Lightbulb, Target, Zap, CheckCircle, Users, Award, Clock, ArrowRight, Star, TrendingUp, Brain, Sparkles } from "lucide-react";
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
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
              <Sparkles className="w-4 h-4 mr-2" />
              Expert Prompt Engineering
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent leading-tight animate-fade-in">
              Transform AI Into Your 
              <span className="block text-indigo-600">Competitive Advantage</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Get professionally crafted, custom prompts that deliver consistent, high-quality results. 
              <span className="font-medium text-slate-800"> Stop wasting time on trial and error.</span>
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <MessageCircle className="mr-3 h-5 w-5" />
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-purple-200 text-purple-700">
              <Brain className="w-4 h-4 mr-2" />
              Our Expertise
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              End-to-End Prompt Engineering
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From strategy to implementation, we deliver custom AI solutions that drive real business results
            </p>
          </div>
          
          <div className="grid gap-8">
            {/* First row with 3 cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service, index) => (
                <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full bg-gradient-to-br from-white to-slate-50/50 hover:from-purple-50/30 hover:to-indigo-50/30 transform hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-8 w-8 text-purple-600 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-lg leading-relaxed">{service.description}</p>
                    <div className="mt-6 text-purple-600 group-hover:text-indigo-600 font-medium inline-flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Second row with 2 centered cards */}
            <div className="flex justify-center">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
                {services.slice(3, 5).map((service, index) => (
                  <Card key={index + 3} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full bg-gradient-to-br from-white to-slate-50/50 hover:from-purple-50/30 hover:to-indigo-50/30 transform hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="h-8 w-8 text-purple-600 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 text-lg leading-relaxed">{service.description}</p>
                      <div className="mt-6 text-purple-600 group-hover:text-indigo-600 font-medium inline-flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-purple-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-green-200 text-green-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Proven Results
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Why Industry Leaders Choose Us
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join hundreds of companies that have transformed their AI capabilities with our expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="group flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <span className="text-slate-700 font-medium text-lg leading-relaxed group-hover:text-slate-900 transition-colors">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* CTA in Benefits */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to 10X Your AI Results?</h3>
              <p className="text-slate-600 mb-6">Join the companies already seeing dramatic improvements in their AI workflows.</p>
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Star className="mr-2 h-5 w-5" />
                Get Your Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-purple-200 text-purple-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Your Project
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tell us about your vision and we'll create a custom solution that exceeds your expectations
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Start With Us?</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">24-Hour Response</h4>
                      <p className="text-slate-600">We respond to all inquiries within one business day</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mt-1">
                      <Award className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Expert Team</h4>
                      <p className="text-slate-600">Certified prompt engineers with 5+ years experience</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Guaranteed Results</h4>
                      <p className="text-slate-600">100% satisfaction guarantee or your money back</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900 rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="text-slate-300 mb-6">Schedule a free 15-minute strategy call with our experts</p>
                <Button variant="outline" className="w-full border-white text-slate-900 bg-white hover:bg-slate-100">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Book Free Call
                </Button>
              </div>
            </div>
            
            {/* Contact Form */}
            <Card className="border-0 shadow-2xl bg-white">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-bold text-slate-900">Get Your Free Consultation</CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Fill out the form below and we'll get back to you within 24 hours with a custom strategy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name *</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="Your full name" 
                        required 
                        className="h-12 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address *</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="your.email@company.com" 
                        required 
                        className="h-12 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium text-slate-700">Company/Organization</Label>
                      <Input 
                        id="company" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleInputChange} 
                        placeholder="Your company name" 
                        className="h-12 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectType" className="text-sm font-medium text-slate-700">Project Type</Label>
                      <Input 
                        id="projectType" 
                        name="projectType" 
                        value={formData.projectType} 
                        onChange={handleInputChange} 
                        placeholder="Content Generation, Support, etc." 
                        className="h-12 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-sm font-medium text-slate-700">Desired Timeline</Label>
                      <Input 
                        id="timeline" 
                        name="timeline" 
                        value={formData.timeline} 
                        onChange={handleInputChange} 
                        placeholder="2-3 weeks, ASAP, etc." 
                        className="h-12 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-sm font-medium text-slate-700">Budget Range</Label>
                      <Input 
                        id="budget" 
                        name="budget" 
                        value={formData.budget} 
                        onChange={handleInputChange} 
                        placeholder="$5,000-$10,000" 
                        className="h-12 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-slate-700">Project Description *</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      placeholder="Describe your project, goals, and specific requirements. What challenges are you facing with AI prompts?" 
                      className="min-h-[140px] border-slate-200 focus:border-purple-500 focus:ring-purple-500 resize-none" 
                      required 
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting} 
                      className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-3 h-5 w-5" />
                          Get My Free Consultation
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default PromptConsulting;