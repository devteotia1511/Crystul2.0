"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon } from "lucide-react";
import AuthenticatedLayout from "@/components/authenticated-layout";
import Link from "next/link";

interface UserResult {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  title: string;
  skills: string[];
  location: string;
}

const mockUsers: UserResult[] = [
  {
    id: '1',
    username: '@sarahchen',
    name: 'Sarah Chen',
    title: 'Product Designer & UX Lead',
    skills: ['UI/UX', 'Figma', 'Design Systems'],
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    username: '@marcusj',
    name: 'Marcus Johnson',
    title: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'TypeScript'],
    location: 'New York, NY',
  },
  {
    id: '3',
    username: '@alexrodriguez',
    name: 'Alex Rodriguez',
    title: 'AI/ML Engineer',
    skills: ['Python', 'TensorFlow', 'ML'],
    location: 'Austin, TX',
  },
  {
    id: '4',
    username: '@emmawilson',
    name: 'Emma Wilson',
    title: 'Growth Marketing Expert',
    skills: ['SEO', 'Content', 'Analytics'],
    location: 'Remote',
  },
  {
    id: '5',
    username: '@davidkim',
    name: 'David Kim',
    title: 'Backend Engineer',
    skills: ['Go', 'Kubernetes', 'AWS'],
    location: 'Seattle, WA',
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Filter users based on username or name
    const results = mockUsers.filter(user => 
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
  };

  return (
    <AuthenticatedLayout>
      <div className="w-full h-[calc(100vh-4rem)] lg:h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search</h1>
            <p className="text-muted-foreground">
              Find entrepreneurs and co-founders by username
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by username or name..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="space-y-4">
              {searchResults.length > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </p>
                  {searchResults.map((user) => (
                    <Link
                      key={user.id}
                      href={`/profile/${user.id}`}
                      className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">
                            {user.username}
                          </span>
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {user.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="text-center py-12">
                  <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    No users found for "{searchQuery}"
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try searching with a different username or name
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!searchQuery && (
            <div className="text-center py-20">
              <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-30" />
              <p className="text-lg text-muted-foreground mb-2">
                Start typing to search for users
              </p>
              <p className="text-sm text-muted-foreground">
                Search by username or full name to find co-founders and teammates
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
