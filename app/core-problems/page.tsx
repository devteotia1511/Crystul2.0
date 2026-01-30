"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChevronLeft, ChevronRight, X, Lightbulb, Users, TrendingDown, Search } from 'lucide-react';

export default function CoreProblemsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const coreProblems = useMemo(() => [
    {
      id: 1,
      title: "Gap Between Idea and Execution",
      icon: Lightbulb,
      description: "People have ideas, but:",
      problems: [
        "No roadmap exists",
        "No structured process available", 
        "Randomly browsing YouTube and Google"
      ],
      result: "Result: Ideas die before reaching MVP stage.",
      image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800&h=600&fit=crop&crop=entropy&auto=format",
      color: "from-red-500/20 to-orange-500/20"
    },
    {
      id: 2,
      title: "No Validation System",
      icon: TrendingDown,
      description: "Most founders:",
      problems: [
        "Get emotionally attached to their ideas",
        "Don't conduct market validation",
        "Don't get feedback from experienced/C-suite executives"
      ],
      result: "Result: After significant effort, startups fail.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=entropy&auto=format",
      color: "from-yellow-500/20 to-amber-500/20"
    },
    {
      id: 3,
      title: "Difficulty Finding the Right Team",
      icon: Users,
      description: "College or early-stage founders have:",
      problems: [
        "Ideas and willingness",
        "Skills",
        "No network"
      ],
      result: "Due to lack of skilled team building, startups fail.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop&crop=entropy&auto=format",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: 4,
      title: "Funding System is Confusing",
      icon: Search,
      description: "For early-stage founders:",
      problems: [
        "Unaware of government schemes",
        "Incubator process unclear",
        "No access to angel/VC investors",
        "No guidance on when and how to pitch"
      ],
      result: "Result: Good ideas die due to lack of structured funding path.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&crop=center&auto=format",
      color: "from-purple-500/20 to-pink-500/20"
    }
  ], []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % coreProblems.length);
    setIsAutoPlay(false);
  }, [coreProblems.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + coreProblems.length) % coreProblems.length);
    setIsAutoPlay(false);
  }, [coreProblems.length]);

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push('/home');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (isAutoPlay) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % coreProblems.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlay, coreProblems.length]);

  if (status === "authenticated") return null;

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
              <span className="text-primary font-heading transition-colors font-medium">Core Problems</span>
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            CORE <span className="text-primary">PROBLEMS</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            The Real Pain: Today's students and early professionals face 4 major issues
          </p>
        </div>
      </section>

      {/* Problems Slider */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Slide Display */}
          <div className="relative mb-8">
            <Card className="border-border bg-card/50 shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-96">
                  <Image
                    src={coreProblems[currentSlide].image}
                    alt={coreProblems[currentSlide].title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${coreProblems[currentSlide].color}`}></div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                      {(() => {
                        const IconComponent = coreProblems[currentSlide].icon;
                        return <IconComponent className="w-6 h-6 text-primary" />;
                      })()}
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      ❌ Problem {coreProblems[currentSlide].id}
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {coreProblems[currentSlide].title}
                  </h3>

                  <p className="text-lg text-muted-foreground mb-6">
                    {coreProblems[currentSlide].description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {coreProblems[currentSlide].problems.map((problem, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-foreground">{problem}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <p className="text-destructive font-semibold">
                      {coreProblems[currentSlide].result}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Slide Navigation */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="border-border hover:bg-primary/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {coreProblems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index
                      ? 'bg-primary'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="border-border hover:bg-primary/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Thumbnail Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {coreProblems.map((problem, index) => (
              <Card
                key={problem.id}
                className={`border-border bg-card/30 cursor-pointer transition-all hover:shadow-lg hover:border-primary/40 ${
                  currentSlide === index ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => goToSlide(index)}
              >
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {(() => {
                      const IconComponent = problem.icon;
                      return <IconComponent className="w-5 h-5 text-primary mr-2" />;
                    })()}
                    <span className="text-sm font-semibold text-primary">Problem {problem.id}</span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground line-clamp-2">
                    {problem.title}
                  </h4>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution CTA Section */}
      <section className="bg-primary py-20 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            This is the right time to move toward the Solution
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't let these problems stop your startup journey. Join Crystul and turn your ideas into reality.
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-muted font-display font-semibold text-lg px-8 py-6">
              Start Your Journey Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
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
