"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SidebarNavigation from './sidebar-navigation';
import InstagramChat from './chat/chat';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/login');
    }
  }, [status, router]);

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

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarNavigation />
      <InstagramChat />
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="w-full">
          {children}
        </div>
      </main>

    </div>
  );
}
