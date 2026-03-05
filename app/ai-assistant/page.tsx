"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Brain, Target, Users, TrendingUp, Shield, Zap, MessageSquare, Lightbulb, CheckCircle, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function AiAssistantPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If authenticated, redirect immediately
  if (status === "authenticated" && session) {
    router.push('/ai-assistant/chat');
    return null;
  }

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-xl font-display font-semibold text-foreground mb-2">
            Loading...
          </h1>
          <p className="text-muted-foreground font-sans">
            Please wait while we load your content.
          </p>
        </div>
      </div>
    );
  }

  // Only show landing page if not authenticated

  const aiCapabilities = [
    {
      icon: Brain,
      title: "Ideation & Concept Development",
      description: "Generate and refine startup ideas, identify market opportunities, and develop unique value propositions",
      features: [
        "AI-powered idea generation",
        "Market gap analysis",
        "Competitor landscape mapping",
        "Business model suggestions"
      ]
    },
    {
      icon: Target,
      title: "Strategic Planning",
      description: "Create comprehensive roadmaps, set milestones, and develop actionable strategies for growth",
      features: [
        "Go-to-market strategies",
        "Product roadmap planning",
        "Milestone definition",
        "Growth hacking tactics"
      ]
    },
    {
      icon: Users,
      title: "Team Building & Management",
      description: "Optimize team structure, define roles, and provide leadership guidance for startup success",
      features: [
        "Team composition analysis",
        "Role definition frameworks",
        "Conflict resolution strategies",
        "Leadership development"
      ]
    },
    {
      icon: TrendingUp,
      title: "Market Analysis & Insights",
      description: "Analyze market trends, customer behavior, and competitive positioning for data-driven decisions",
      features: [
        "Market size estimation",
        "Customer personal development",
        "Competitive analysis",
        "Trend forecasting"
      ]
    },
    {
      icon: Shield,
      title: "Risk Assessment & Mitigation",
      description: "Identify potential risks and develop strategies to minimize startup failure probability",
      features: [
        "Risk matrix analysis",
        "Contingency planning",
        "Legal compliance guidance",
        "Financial risk modeling"
      ]
    },
    {
      icon: Zap,
      title: "Operational Excellence",
      description: "Streamline processes, optimize workflows, and implement best practices for efficient execution",
      features: [
        "Process optimization",
        "Resource allocation",
        "Performance metrics",
        "Automation strategies"
      ]
    }
  ];

  const cofounderBenefits = [
    {
      icon: MessageSquare,
      title: "24/7 Availability",
      description: "Your AI cofounder is always available to discuss ideas, solve problems, and provide guidance"
    },
    {
      icon: Lightbulb,
      title: "Unbiased Perspective",
      description: "Get objective, data-driven insights without emotional bias or personal agendas"
    },
    {
      icon: CheckCircle,
      title: "Proven Methodologies",
      description: "Access to frameworks and strategies from thousands of successful startups and research"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="relative">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Crystul
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/ai-assistant">
              <span className="text-primary font-heading transition-colors font-medium">AI Assistant</span>
            </Link>
            <Link href="/core-problems">
              <span className="text-foreground hover:text-primary font-heading transition-colors font-medium">Core Problems</span>
            </Link>
            <Link href="/our-solutions">
              <span className="text-foreground hover:text-primary font-heading transition-colors font-medium">Our Solution</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-primary/10">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-primary text-primary-foreground font-medium hover:opacity-90 shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 w-9 p-0 text-foreground hover:text-primary hover:bg-primary/10">
                    <Menu className="h-6 w-6" />
                  </Button>
              </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                  <DropdownMenuItem asChild className="text-foreground hover:text-primary hover:bg-primary/10">
                  <Link href="/ai-assistant">AI Assistant</Link>
                </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-foreground hover:text-primary hover:bg-primary/10">
                    <Link href="/core-problems">Core Problems</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-foreground hover:text-primary hover:bg-primary/10">
                  <Link href="/our-solutions">Our Solution</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Meet Your AI <span className="text-primary">Co-founder</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            The intelligent companion that guides you through every stage of your startup journey, from ideation to scaling
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 text-lg px-8 py-6 font-semibold">
                Start Building with AI <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/core-problems">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary hover:bg-primary hover:text-primary-foreground">
                Understand Startup Challenges
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is AI Co-founder Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            What Makes an AI Co-founder Revolutionary?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Traditional co-founders bring human expertise, but our AI Co-founder combines the knowledge of thousands of successful entrepreneurs, 
            data-driven insights, and instant availability to provide guidance that's both comprehensive and immediately accessible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {cofounderBenefits.map((benefit, index) => (
            <Card key={index} className="border-border bg-card/50 shadow-lg text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How Your AI Co-founder Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, intuitive interaction that delivers powerful insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Ask Anything</h3>
              <p className="text-sm text-muted-foreground">Describe your challenge, idea, or question in natural language</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">Our AI processes your request using vast startup knowledge and data</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Get Insights</h3>
              <p className="text-sm text-muted-foreground">Receive actionable advice, strategies, and specific recommendations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Execute & Iterate</h3>
              <p className="text-sm text-muted-foreground">Implement the guidance and return for continuous optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Complete Startup Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your AI Co-founder provides expertise across all critical startup domains
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiCapabilities.map((capability, index) => (
            <Card key={index} className="border-border bg-card/50 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <capability.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{capability.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{capability.description}</p>
                <div className="space-y-2">
                  {capability.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Meet Your AI Co-founder?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who are building successful startups with AI guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-muted font-semibold text-lg px-8 py-6">
                Start Your AI Journey <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/our-solutions">
              <Button size="lg" variant="outline" className="border-background bg-transparent text-background hover:bg-background hover:text-primary font-semibold text-lg px-8 py-6">
                Explore Our Solution
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border text-foreground py-16 w-full rounded-t-xl">
        <div className="mx-auto max-w-screen-xl px-4 pt-8 pb-6 sm:px-6 lg:px-8 lg:pt-12">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6">
              Crystul
            </div>
            <p className="text-foreground/50 max-w-md mx-auto leading-relaxed">
              Building successful startup teams through intelligent matchmaking. Connect with like-minded entrepreneurs, find your perfect co-founders, and turn your startup ideas into reality.
            </p>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm text-foreground/70">
                &copy; 2026 Crystul. Building the future of startup collaboration.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
