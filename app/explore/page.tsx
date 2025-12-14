"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import AuthenticatedLayout from "@/components/authenticated-layout";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
    title: string;
  };
  content: string;
  image?: string;
  tags: string[];
  likes: number;
  comments: number;
  timestamp: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

// Mock posts with images - business/professional content only
const mockPosts: Post[] = [
  {
    id: '1',
    author: { name: 'Sarah Chen', username: '@sarahchen', title: 'Product Designer' },
    content: 'Design system showcase - our new component library',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=400&fit=crop',
    tags: ['Design', 'UI/UX'],
    likes: 1243,
    comments: 89,
    timestamp: '2h ago',
    aspectRatio: 'square',
  },
  {
    id: '2',
    author: { name: 'Marcus Johnson', username: '@marcusj', title: 'Full Stack Developer' },
    content: 'Real-time collaboration architecture',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop',
    tags: ['Tech', 'Architecture'],
    likes: 892,
    comments: 56,
    timestamp: '5h ago',
    aspectRatio: 'portrait',
  },
  {
    id: '3',
    author: { name: 'Alex Rodriguez', username: '@alexr', title: 'AI/ML Engineer' },
    content: 'AI model for customer churn prediction',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
    tags: ['AI/ML', 'Data Science'],
    likes: 2034,
    comments: 156,
    timestamp: '1d ago',
    aspectRatio: 'square',
  },
  {
    id: '4',
    author: { name: 'Emma Wilson', username: '@emmaw', title: 'Growth Marketer' },
    content: 'Growth strategy that got us to 10K users',
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=500&h=400&fit=crop',
    tags: ['Growth', 'Marketing'],
    likes: 1567,
    comments: 134,
    timestamp: '1d ago',
    aspectRatio: 'landscape',
  },
  {
    id: '5',
    author: { name: 'David Kim', username: '@davidkim', title: 'Backend Engineer' },
    content: 'Microservices migration lessons',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop',
    tags: ['Backend', 'DevOps'],
    likes: 1789,
    comments: 98,
    timestamp: '2d ago',
    aspectRatio: 'square',
  },
  {
    id: '6',
    author: { name: 'Lisa Martinez', username: '@lisam', title: 'UX Researcher' },
    content: 'Co-founder matching insights',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop',
    tags: ['UX', 'Research'],
    likes: 923,
    comments: 67,
    timestamp: '2d ago',
    aspectRatio: 'portrait',
  },
  {
    id: '7',
    author: { name: 'James Taylor', username: '@jamest', title: 'CTO' },
    content: 'Technical debt management strategy',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=400&fit=crop',
    tags: ['Engineering', 'Leadership'],
    likes: 2413,
    comments: 201,
    timestamp: '3d ago',
    aspectRatio: 'square',
  },
  {
    id: '8',
    author: { name: 'Nina Patel', username: '@ninap', title: 'Product Manager' },
    content: 'Product roadmapping framework',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop',
    tags: ['Product', 'Strategy'],
    likes: 1342,
    comments: 87,
    timestamp: '3d ago',
    aspectRatio: 'landscape',
  },
  {
    id: '9',
    author: { name: 'Chris Anderson', username: '@chrisa', title: 'Mobile Developer' },
    content: 'Offline-first mobile app architecture',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop',
    tags: ['Mobile', 'React Native'],
    likes: 1678,
    comments: 112,
    timestamp: '4d ago',
    aspectRatio: 'square',
  },
];

export default function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initial load
  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  // Load more posts
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setTimeout(() => {
      const newPosts = mockPosts.map(post => ({
        ...post,
        id: `${post.id}-page${page}`,
      }));
      setPosts(prev => [...prev, ...newPosts]);
      setPage(prev => prev + 1);
      setLoading(false);
      
      // Simulate end of content after 5 pages
      if (page >= 5) {
        setHasMore(false);
      }
    }, 1000);
  }, [loading, hasMore, page]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, hasMore, loading]);

  return (
    <AuthenticatedLayout>
      <div className="w-full h-[calc(100vh-4rem)] lg:h-screen overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-1 sm:px-2 py-8">
          {/* Header */}
          <div className="px-3 mb-6">
            <h1 className="text-2xl font-bold mb-1">Explore</h1>
            <p className="text-sm text-muted-foreground">
              Discover business insights, projects, and knowledge
            </p>
          </div>

          {/* Instagram-style Grid */}
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative group cursor-pointer overflow-hidden bg-muted"
                style={{
                  aspectRatio: post.aspectRatio === 'portrait' ? '4/5' : 
                             post.aspectRatio === 'landscape' ? '5/4' : '1',
                }}
              >
                {/* Post Image */}
                <div className="w-full h-full relative">
                  <Image
                    src={post.image || ''}
                    alt={post.content}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white p-4">
                  <div className="flex items-center space-x-6 mb-3">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-6 w-6 fill-white" />
                      <span className="font-semibold text-lg">{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-6 w-6 fill-white" />
                      <span className="font-semibold text-lg">{post.comments}</span>
                    </div>
                  </div>
                  <p className="text-center text-sm line-clamp-2 hidden sm:block">
                    {post.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
            </div>
          )}

          {/* End of content */}
          {!hasMore && (
            <div className="text-center py-12 text-muted-foreground">
              <p>You've seen all posts</p>
            </div>
          )}

          {/* Intersection Observer Target */}
          <div ref={observerTarget} className="h-10" />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
