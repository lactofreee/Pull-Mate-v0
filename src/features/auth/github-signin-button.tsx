"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const handleGitHubLogin = () => {
  signIn("github", { callbackUrl: "/dashboard" });
};

export function GitHubSignInButton() {
  return (
    <Button
      className="w-full h-12 cursor-pointer"
      size="lg"
      onClick={handleGitHubLogin}
    >
      <Github className="mr-2 h-5 w-5" />
      Sign in with GitHub
    </Button>
  );
}
