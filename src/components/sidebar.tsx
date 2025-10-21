"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  GitPullRequest,
  FolderGit2,
  Activity,
  Settings,
  FileText,
  Menu,
  Github,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard", // Updated dashboard route
    icon: LayoutDashboard,
  },
  {
    name: "PR Editor",
    href: "/pr-editor",
    icon: GitPullRequest,
  },
  {
    name: "Repositories",
    href: "/repositories",
    icon: FolderGit2,
  },
  {
    name: "Activity Log",
    href: "/activity",
    icon: Activity,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Documentation",
    href: "/docs",
    icon: FileText,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-6">
            <Github className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Pull-Mate</h2>
          </div>
          <div className="space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href &&
                    "bg-secondary text-secondary-foreground"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <Sidebar />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
