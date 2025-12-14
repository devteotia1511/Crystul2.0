"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Briefcase, 
  Calendar, 
  Star, 
  Search,
  MapPin,
  Clock
} from "lucide-react";
import AuthenticatedLayout from "@/components/authenticated-layout";

interface Professional {
  id: string;
  name: string;
  avatar?: string;
  currentRole: string;
  company: string;
  experience: number;
  domain: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  location: string;
  bio: string;
}

const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Jennifer Martinez',
    currentRole: 'CEO & Co-founder',
    company: 'TechVentures Inc.',
    experience: 15,
    domain: ['SaaS', 'Product Strategy', 'Fundraising'],
    rating: 4.9,
    reviews: 127,
    hourlyRate: 250,
    location: 'San Francisco, CA',
    bio: 'Serial entrepreneur with 3 successful exits. Specialized in early-stage SaaS companies.',
  },
  {
    id: '2',
    name: 'Michael Chen',
    currentRole: 'CTO',
    company: 'DataFlow Systems',
    experience: 12,
    domain: ['Engineering', 'AI/ML', 'Cloud Architecture'],
    rating: 4.8,
    reviews: 98,
    hourlyRate: 220,
    location: 'Seattle, WA',
    bio: 'Former Principal Engineer at Amazon. Expert in building scalable systems.',
  },
  {
    id: '3',
    name: 'Sarah Thompson',
    currentRole: 'CMO',
    company: 'GrowthLab',
    experience: 10,
    domain: ['Growth Marketing', 'Brand Strategy', 'B2B Sales'],
    rating: 4.9,
    reviews: 156,
    hourlyRate: 200,
    location: 'New York, NY',
    bio: 'Led marketing for 3 unicorn startups. Expert in scaling from 0 to 10M ARR.',
  },
  {
    id: '4',
    name: 'David Park',
    currentRole: 'CFO',
    company: 'Venture Capital Partners',
    experience: 18,
    domain: ['Finance', 'Fundraising', 'M&A'],
    rating: 4.7,
    reviews: 89,
    hourlyRate: 280,
    location: 'Boston, MA',
    bio: 'Previously CFO at 2 public companies. Raised over $500M in venture capital.',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    currentRole: 'COO',
    company: 'Operations Excellence Co.',
    experience: 14,
    domain: ['Operations', 'Scaling', 'Process Optimization'],
    rating: 4.8,
    reviews: 103,
    hourlyRate: 230,
    location: 'Austin, TX',
    bio: 'Operations expert who scaled 5 companies from 10 to 500+ employees.',
  },
  {
    id: '6',
    name: 'Robert Kim',
    currentRole: 'CPO',
    company: 'ProductFirst',
    experience: 11,
    domain: ['Product Management', 'UX Strategy', 'Innovation'],
    rating: 4.9,
    reviews: 134,
    hourlyRate: 210,
    location: 'San Jose, CA',
    bio: 'Built products used by 100M+ users. Led product at multiple Fortune 500s.',
  },
  {
    id: '7',
    name: 'Amanda Foster',
    currentRole: 'VP of Engineering',
    company: 'CloudScale Tech',
    experience: 13,
    domain: ['Engineering Leadership', 'DevOps', 'Security'],
    rating: 4.8,
    reviews: 76,
    hourlyRate: 240,
    location: 'Denver, CO',
    bio: 'Expert in building and leading world-class engineering teams.',
  },
  {
    id: '8',
    name: 'James Wilson',
    currentRole: 'Chief Strategy Officer',
    company: 'Strategic Ventures',
    experience: 16,
    domain: ['Business Strategy', 'Market Entry', 'Partnerships'],
    rating: 4.7,
    reviews: 92,
    hourlyRate: 270,
    location: 'Chicago, IL',
    bio: 'Strategy consultant turned startup advisor. Helped 20+ startups find PMF.',
  },
  {
    id: '9',
    name: 'Emily Rodriguez',
    currentRole: 'Head of Sales',
    company: 'SalesForce Elite',
    experience: 9,
    domain: ['Enterprise Sales', 'Revenue Growth', 'Team Building'],
    rating: 4.9,
    reviews: 142,
    hourlyRate: 190,
    location: 'Miami, FL',
    bio: 'Built and scaled sales teams generating $50M+ in annual revenue.',
  },
];

export default function ProfessionalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfessionals, setFilteredProfessionals] = useState(mockProfessionals);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredProfessionals(mockProfessionals);
      return;
    }

    const filtered = mockProfessionals.filter(pro => 
      pro.name.toLowerCase().includes(query.toLowerCase()) ||
      pro.currentRole.toLowerCase().includes(query.toLowerCase()) ||
      pro.domain.some(d => d.toLowerCase().includes(query.toLowerCase())) ||
      pro.company.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredProfessionals(filtered);
  };

  return (
    <AuthenticatedLayout>
      <div className="w-full h-[calc(100vh-4rem)] lg:h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Professionals</h1>
            <p className="text-muted-foreground mb-6">
              Connect with C-suite executives and industry leaders for 1-on-1 guidance
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, role, expertise, or company..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 py-6 text-base"
              />
            </div>
          </div>

          {/* Professionals Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <Card 
                key={professional.id} 
                className="border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all overflow-hidden group"
              >
                <CardContent className="p-6">
                  {/* Avatar and Basic Info */}
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                      <AvatarImage src={professional.avatar} alt={professional.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                        {professional.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {professional.name}
                    </h3>
                    
                    <div className="space-y-1 mb-3">
                      <p className="text-sm font-medium text-primary">
                        {professional.currentRole}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {professional.company}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm">{professional.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({professional.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Experience and Location */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                    <div className="flex items-center space-x-1">
                      <Briefcase className="h-3 w-3" />
                      <span>{professional.experience} years</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{professional.location.split(',')[0]}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
                    {professional.bio}
                  </p>

                  {/* Domain Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {professional.domain.map((domain) => (
                      <Badge 
                        key={domain} 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        {domain}
                      </Badge>
                    ))}
                  </div>

                  {/* Hourly Rate and Book Button */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Hourly Rate</p>
                        <p className="text-2xl font-bold text-foreground">
                          ${professional.hourlyRate}
                        </p>
                      </div>
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <Button className="w-full group-hover:bg-primary group-hover:scale-105 transition-transform">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredProfessionals.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-30" />
              <p className="text-lg text-muted-foreground mb-2">
                No professionals found
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search query
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
