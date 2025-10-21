"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { GitHubSignInButton } from "@/features/auth/github-signin-button";
import { MobileSidebar } from "@/components/sidebar";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <div className="flex items-center justify-center">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="md:hidden">
                <MobileSidebar />
              </div>
              <Link
                href="/"
                className="text-lg sm:text-xl font-bold tracking-tight"
              >
                Pull-Mate
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center py-24">
        <div className="w-full max-w-md">
          <Button asChild variant="ghost" className="mb-4">
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
              <GitHubSignInButton />
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
