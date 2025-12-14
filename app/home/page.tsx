"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, MapPin, Briefcase, Clock, Users } from "lucide-react";
import AuthenticatedLayout from "@/components/authenticated-layout";
import Link from "next/link";

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  skills: string[];
  experience: string;
  location: string;
  domain: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  founderId: string;
  members: any[];
  openRoles: string[];
  stage: string;
  industry: string;
  isPublic: boolean;
  createdAt: string;
}

export default function HomePage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [stats, setStats] = useState({
    currentOpportunities: 12,
    activeTeams: 3,
    potentialMatches: 8,
  });

  // Mock user profile
  const userProfile: UserProfile = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "",
    skills: ["React", "Node.js", "AI/ML"],
    experience: "3+ years",
    location: "New Delhi, India",
    domain: "Web Development",
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setTeamsLoading(true);
        const res = await fetch('/api/teams');
        const data = await res.json();
        if (data.success) {
          setTeams(data.teams || []);
          // Optionally update stats based on real data
          setStats((prev) => ({
            ...prev,
            activeTeams: data.teams?.length || 0,
          }));
        }
      } catch (e) {
        // fail silently for now
      } finally {
        setTeamsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      team.name.toLowerCase().includes(q) ||
      team.industry.toLowerCase().includes(q) ||
      team.stage.toLowerCase().includes(q) ||
      team.openRoles.some((role) => role.toLowerCase().includes(q))
    );
  });

  return (
    <AuthenticatedLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Profile and User Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">
          {/* Profile Photo + Name */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center h-full space-y-4">
            <Avatar className="h-40 w-40 ring-8 ring-primary/20">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                {userProfile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-1">{userProfile.name}</h2>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            </div>
          </div>

          {/* User Details with banner */}
          <Card className="lg:col-span-9 border-border shadow-sm h-full overflow-hidden">
            <CardContent className="relative p-0 h-full overflow-hidden">
              {/* Banner background: top 60% solid, then fading out */}
              <div className="absolute inset-0">
                <div className="h-[60%] w-full bg-gradient-to-r from-primary/40 via-secondary/40 to-primary/40" />
                <div className="h-[40%] w-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
              </div>

              {/* Foreground content overlaying banner */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Top banner area (for controls), aligned with 60% height */}
                <div className="h-[60%] w-full relative">
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button size="sm" variant="outline" className="bg-background/70 backdrop-blur border-border text-xs">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="bg-background/70 backdrop-blur border-border text-xs">
                      Change Banner
                    </Button>
                  </div>
                </div>

                {/* Details area overlaying lower part of banner */}
                <div className="p-6 space-y-4 bg-background/85 backdrop-blur-md">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{userProfile.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="text-sm">{userProfile.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Domain:</span>
                      <span className="text-sm">{userProfile.domain}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-primary/20 text-primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Current Opportunities in</p>
              <p className="text-xl font-bold text-primary mb-1">{stats.currentOpportunities}</p>
              <p className="text-sm font-medium">{userProfile.domain}</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Total Active Teams in</p>
              <p className="text-xl font-bold text-primary mb-1">{stats.activeTeams}</p>
              <p className="text-sm font-medium">{userProfile.domain}</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Potential Matches</p>
              <p className="text-xl font-bold text-primary mb-1">{stats.potentialMatches}</p>
              <p className="text-sm font-medium">Based on your profile</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search teams by name, tags, or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Teams Grid using real backend data */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Discover Teams
              </h2>
              <p className="text-sm text-muted-foreground">
                Real teams currently building on Crystul
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/teams">View all teams</Link>
            </Button>
          </div>

          {teamsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : filteredTeams.length === 0 ? (
            <Card className="border-border shadow-sm">
              <CardContent className="py-12 text-center space-y-3">
                <Users className="h-10 w-10 text-primary mx-auto" />
                <h3 className="text-lg font-semibold text-foreground">No teams found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or be the first to create a team.
                </p>
                <Button asChild className="bg-primary text-primary-foreground hover:opacity-90 mt-2">
                  <Link href="/teams/create">Create a Team</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team) => (
                <Card
                  key={team.id}
                  className="border-border shadow-sm hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
                          {team.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {team.industry} • {team.stage}
                        </p>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/30 text-xs">
                        {(team.members?.length || 0) + 1} members
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {team.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                      <Badge variant="outline" className="text-xs">
                        {team.industry}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {team.stage}
                      </Badge>
                      {team.openRoles.slice(0, 3).map((role) => (
                        <Badge
                          key={role}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary border-primary/20"
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>

                    <Button asChild size="sm" className="w-full mt-2 bg-primary text-primary-foreground hover:opacity-90">
                      <Link href={`/teams/${team.id}`}>View Team</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
