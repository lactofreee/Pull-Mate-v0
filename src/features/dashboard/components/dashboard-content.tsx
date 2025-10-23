"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderGit2, Star, GitFork, Lock, Unlock, ArrowRight, Settings2 } from "lucide-react"
import Link from "next/link"

const featuredRepositories = [
  {
    id: 1,
    name: "web-app",
    fullName: "company/web-app",
    description: "Main web application with React and TypeScript",
    isPrivate: false,
    stars: 124,
    forks: 23,
    language: "TypeScript",
    lastActivity: "2 hours ago",
    pendingCommits: 3,
  },
  {
    id: 2,
    name: "mobile-ui",
    fullName: "company/mobile-ui",
    description: "React Native mobile application UI components",
    isPrivate: true,
    stars: 45,
    forks: 8,
    language: "JavaScript",
    lastActivity: "1 day ago",
    pendingCommits: 1,
  },
  {
    id: 3,
    name: "api-backend",
    fullName: "company/api-backend",
    description: "Node.js REST API backend with Express and MongoDB",
    isPrivate: true,
    stars: 67,
    forks: 12,
    language: "JavaScript",
    lastActivity: "3 days ago",
    pendingCommits: 5,
  },
]

function getLanguageColor(language: string) {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-500",
    MDX: "bg-purple-500",
    Python: "bg-green-500",
    Go: "bg-cyan-500",
  }
  return colors[language] || "bg-gray-500"
}

export function DashboardContent() {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Repositories</h1>
          <p className="text-muted-foreground mt-1">Select a repository to view commits and create Pull Requests</p>
        </div>
        <Link href="/settings/templates">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings2 className="h-4 w-4" />
            PR Templates
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featuredRepositories.map((repo) => (
          <Link key={repo.id} href={`/repositories/${repo.id}`}>
            <Card className="hover:border-primary hover:shadow-md transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <FolderGit2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{repo.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{repo.fullName}</p>
                    </div>
                  </div>
                  {repo.isPrivate ? (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Unlock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <CardDescription className="text-pretty line-clamp-2">{repo.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)}`} />
                    {repo.language}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {repo.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    {repo.forks}
                  </div>
                </div>
                {repo.pendingCommits > 0 && (
                  <Badge variant="secondary" className="w-full justify-center">
                    {repo.pendingCommits} commit{repo.pendingCommits > 1 ? "s" : ""} ready for PR
                  </Badge>
                )}
                <p className="text-xs text-muted-foreground">Updated {repo.lastActivity}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h3 className="font-semibold">View All Repositories</h3>
            <p className="text-sm text-muted-foreground">Browse and manage all your connected repositories</p>
          </div>
          <Link href="/repositories">
            <Button variant="outline" className="gap-2 bg-transparent">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
