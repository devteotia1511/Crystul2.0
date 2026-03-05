"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Brain, Target, Users, TrendingUp, Shield, Zap, MessageSquare, Lightbulb, CheckCircle, Menu, DollarSign, Rocket } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function OurSolutionsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push('/home');
    }
  }, [status, session, router]);

  if (status === "authenticated") return null;

  const executionFlow = [
    {
      id: 1,
      title: "Ideation",
      icon: Lightbulb,
      description: "Transform your raw ideas into structured concepts",
      overview: "In the ideation phase, we help you transform scattered thoughts into actionable business concepts. Our AI-powered tools analyze market trends, identify gaps, and help you refine your core value proposition. You'll move from 'I have an idea' to 'I have a validated concept worth pursuing'.",
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-600"
    },
    {
      id: 2,
      title: "Validation",
      icon: CheckCircle,
      description: "Test and validate your ideas before investing resources",
      overview: "Validation is where great ideas become viable businesses. We provide structured frameworks to test your assumptions with real customers, gather meaningful feedback, and make data-driven decisions. This phase ensures you're building something people actually want, saving time and resources.",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-600"
    },
    {
      id: 3,
      title: "Collaboration",
      icon: Users,
      description: "Build the perfect team with skilled collaborators",
      overview: "No startup succeeds alone. Our collaboration platform connects you with co-founders and team members who complement your skills and share your vision. Through role-based matching and structured onboarding, you'll build a team that can execute your vision effectively.",
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      title: "Execution",
      icon: Target,
      description: "Turn validated ideas into reality with structured execution",
      overview: "Execution is where strategy becomes reality. We provide project management tools, milestone tracking, and resource allocation frameworks to keep your team aligned and productive. This phase focuses on building your MVP, iterating based on feedback, and achieving product-market fit.",
      color: "from-orange-500/20 to-amber-500/20",
      iconColor: "text-orange-600"
    },
    {
      id: 5,
      title: "Funding",
      icon: DollarSign,
      description: "Secure the right funding at the right time",
      overview: "Funding is fuel for growth, not the destination. We help you identify the right funding sources at the right time, prepare compelling pitches, and connect with investors who understand your vision. From grants to venture capital, we guide you through the entire funding landscape.",
      color: "from-red-500/20 to-rose-500/20",
      iconColor: "text-red-600"
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
              <span className="text-foreground hover:text-primary font-heading transition-colors font-medium">AI Assistant</span>
            </Link>
            <Link href="/core-problems">
              <span className="text-foreground hover:text-primary font-heading transition-colors font-medium">Core Problems</span>
            </Link>
            <Link href="/our-solutions">
              <span className="text-primary font-heading transition-colors font-medium">Our Solution</span>
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
                  <DropdownMenuItem asChild className="text-foreground hover:text-primary hover:bg-primary/10">
                  <Link href="/auth/login">Sign In</Link>
                </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-foreground hover:text-primary hover:bg-primary/10">
                  <Link href="/auth/register">Get Started</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            OUR <span className="text-primary">SOLUTION</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A complete startup ecosystem guiding you from ideation to funding through a structured, proven execution flow
          </p>
        </div>
      </section>

      {/* Execution Flow Overview */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            The Complete Startup Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our structured approach ensures no step is missed, maximizing your chances of startup success
          </p>
        </div>

        {/* Flow Visualization */}
        <div className="relative mb-16">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 via-green-500 via-orange-500 to-red-500 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {executionFlow.map((step, index) => (
              <div key={step.id} className="text-center">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center border-4 border-background shadow-lg`}>
                  <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          {executionFlow.map((step, index) => (
            <Card key={step.id} className="border-border bg-card/50 shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                {/* Step Number and Icon */}
                <div className={`p-8 bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background/90 flex items-center justify-center">
                      <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                    </div>
                    <div className="text-3xl font-bold text-foreground">Step {step.id}</div>
                    <div className="text-xl font-semibold text-foreground mt-2">{step.title}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                  
                  <div className="bg-muted/50 rounded-lg p-6 border border-border">
                    <h4 className="font-semibold text-foreground mb-3">Step Overview:</h4>
                    <p className="text-foreground leading-relaxed">{step.overview}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Our Execution Flow Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proven methodologies that increase startup success rates by 300%
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-border bg-card/50 shadow-lg text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Fast Execution</h3>
            <p className="text-muted-foreground">
              Go from idea to MVP in 90 days with our streamlined processes and AI-powered tools
            </p>
          </Card>

          <Card className="border-border bg-card/50 shadow-lg text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Risk Reduction</h3>
            <p className="text-muted-foreground">
              Validate ideas before investing time and money, reducing failure rates by 80%
            </p>
          </Card>

          <Card className="border-border bg-card/50 shadow-lg text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Scalable Growth</h3>
            <p className="text-muted-foreground">
              Build foundations that support rapid scaling and attract investor interest
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Startup Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of founders who have successfully launched their startups using our proven execution flow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-muted font-display font-semibold text-lg px-8 py-6">
                Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/core-problems">
              <Button size="lg" variant="outline" className="border-background bg-transparent text-background hover:bg-background hover:text-primary font-display font-semibold text-lg px-8 py-6">
                Understand the Problems
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
                &copy; 2024 Crystul. Building the future of startup collaboration.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
