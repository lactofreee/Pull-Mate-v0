"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const handleGitHubLogout = async () => {
  await signOut({
    callbackUrl: "/",
    redirect: true,
  });
};

export function GitHubSignOutButton() {
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
