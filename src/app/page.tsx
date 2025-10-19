import Link from "next/link";

import { Github, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/mode-toggle";
import { auth, signOut } from "../auth";

export default async function LandingPage() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <div className="flex items-center justify-center">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="lg:text-xl font-bold">Pull-Mate</span>
            </div>
            <div className="flex items-center">
              {!session && (
                <Button asChild variant="ghost">
                  <Link href="/login">Sign In</Link>
                </Button>
              )}

              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-8 py-24 md:py-32">
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
            AI-Powered Pull Request Assistant
          </h1>
          <p className="max-w-[750px] text-pretty text-lg text-muted-foreground md:text-xl">
            Streamline your code review process with intelligent PR generation,
            automated reviews, and customizable templates.
          </p>
          <div className="flex gap-4 mt-4">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/login">
                <Github className="mr-2 h-5 w-5" />
                Sign in with GitHub
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 bg-transparent"
            >
              <Link href="/docs">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Generate comprehensive PR descriptions in seconds with AI-powered
              analysis of your commits.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Smart Templates</h3>
            <p className="text-muted-foreground">
              Customize report templates to match your team's workflow and let
              AI fill in the details.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your code stays secure with GitHub OAuth integration and
              enterprise-grade security.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col items-center gap-6 rounded-lg border bg-card p-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to streamline your PRs?
          </h2>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            Join developers who are saving hours every week with AI-powered pull
            request management.
          </p>
          <Button asChild size="lg" className="h-12 px-8">
            <Link href="/login">
              <Github className="mr-2 h-5 w-5" />
              Get Started with GitHub
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6 text-primary" />
            <span className="font-bold">Pull-Mate</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Pull-Mate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
