"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { MobileSidebar } from "@/components/sidebar";
import { HeaderDropDown } from "./header-drop-down";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <div className="flex h-16 items-center justify-between">
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
        <div className="flex items-center gap-2 ml-auto">
          <ModeToggle />
          <HeaderDropDown />
        </div>
      </div>
    </header>
  );
}
