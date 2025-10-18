"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Github, ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/src/components/mode-toggle";

export default function LoginPage() {
  const handleGitHubLogin = () => {
    // In a real implementation, this would redirect to GitHub OAuth
    // For now, we'll redirect to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Github className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Pull-Mate</span>
          </Link>
          <ModeToggle />
        </div>
      </header>

      {/* Login Form */}
      <div className="container flex items-center justify-center py-24">
        <div className="w-full max-w-md">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Sign in to Pull-Mate
              </CardTitle>
              <CardDescription>
                Connect your GitHub account to get started with AI-powered pull
                requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full h-12"
                size="lg"
                onClick={handleGitHubLogin}
              >
                <Github className="mr-2 h-5 w-5" />
                Continue with GitHub
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Why GitHub?
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Pull-Mate requires GitHub access to:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Read your repositories and commits</li>
                  <li>Create and manage pull requests</li>
                  <li>Analyze code changes for AI insights</li>
                </ul>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                By signing in, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
