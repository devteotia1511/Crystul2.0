"use client";

export default function MinimalPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Minimal Test Page</h1>
        <p className="text-muted-foreground">This page has no complex components or hooks.</p>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">If this works, the issue is with complex components.</p>
          <p className="text-sm text-muted-foreground">If this fails, it's a more fundamental issue.</p>
        </div>
        <a 
          href="/" 
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
