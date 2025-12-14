"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, ArrowRight } from "lucide-react";
import AuthenticatedLayout from "@/components/authenticated-layout";
import { cn } from "@/lib/utils";

type CreateOption = 'team' | 'post' | null;

export default function CreatePage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<CreateOption>(null);

  const handleCreateTeam = () => {
    router.push('/teams/create');
  };

  const handleCreatePost = () => {
    router.push('/create/post');
  };

  return (
    <AuthenticatedLayout>
      <div className="w-full h-[calc(100vh-4rem)] lg:h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">Create</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose what you'd like to create: build your team or share your insights with the community
            </p>
          </div>

          {/* Creation Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Create Team Card */}
            <Card 
              className={cn(
                "border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105",
                selectedOption === 'team' 
                  ? "border-primary shadow-xl scale-105" 
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => setSelectedOption('team')}
            >
              <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                <div className={cn(
                  "p-6 rounded-full transition-colors",
                  selectedOption === 'team' ? "bg-primary" : "bg-primary/10"
                )}>
                  <Users className={cn(
                    "h-16 w-16 transition-colors",
                    selectedOption === 'team' ? "text-primary-foreground" : "text-primary"
                  )} />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Create Team</h2>
                  <p className="text-muted-foreground">
                    Start building your startup team. Define your vision, set roles, and find the right co-founders to bring your idea to life.
                  </p>
                </div>

                <ul className="text-sm text-left space-y-2 w-full">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Define team vision and goals</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Set open roles you're looking for</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Get discovered by potential co-founders</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Collaborate on projects and tasks</span>
                  </li>
                </ul>

                <Button 
                  size="lg" 
                  className="w-full group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCreateTeam();
                  }}
                >
                  Create Team
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Create Post Card */}
            <Card 
              className={cn(
                "border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105",
                selectedOption === 'post' 
                  ? "border-primary shadow-xl scale-105" 
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => setSelectedOption('post')}
            >
              <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                <div className={cn(
                  "p-6 rounded-full transition-colors",
                  selectedOption === 'post' ? "bg-primary" : "bg-primary/10"
                )}>
                  <FileText className={cn(
                    "h-16 w-16 transition-colors",
                    selectedOption === 'post' ? "text-primary-foreground" : "text-primary"
                  )} />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Create Post</h2>
                  <p className="text-muted-foreground">
                    Share your knowledge, showcase your work, or document your journey. Help others learn from your experience.
                  </p>
                </div>

                <ul className="text-sm text-left space-y-2 w-full">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Share business insights and learnings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Showcase your projects and skills</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Build your professional brand</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Engage with the community</span>
                  </li>
                </ul>

                <Button 
                  size="lg" 
                  className="w-full group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCreatePost();
                  }}
                >
                  Create Post
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Tip */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-medium">Tip:</span> Teams help you find co-founders, while posts help you build your reputation and network.
            </p>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
