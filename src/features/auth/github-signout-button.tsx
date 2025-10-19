"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function GitHubSignOutButton() {
  const handleGitHubLogout = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={handleGitHubLogout}
      className="w-full cursor-pointer"
      size="lg"
    >
      Sign out
    </Button>
  );
}
