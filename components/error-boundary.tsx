"use client"

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Log additional details for debugging
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Error Stack:', error.stack);
    
    // Try to send error details to console for Vercel logs
    if (typeof window !== 'undefined') {
      console.error('Window location:', window.location.href);
      console.error('User agent:', navigator.userAgent);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center p-8 max-w-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Something went wrong
              </h2>
              <p className="text-muted-foreground mb-6">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              
              {/* Show error details for debugging */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                  <h3 className="font-bold text-red-800 mb-2">Error Details:</h3>
                  <p className="text-sm text-red-700 break-all">{this.state.error.message}</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-red-600">Stack Trace</summary>
                    <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap break-all">
                      {this.state.error.stack}
                    </pre>
                  </details>
                </div>
              )}
              
              <div className="space-x-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                >
                  Refresh Page
                </button>
                <button
                  onClick={() => this.setState({ hasError: false, error: undefined })}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
