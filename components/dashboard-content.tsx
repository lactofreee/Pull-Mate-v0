"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitCommit, GitPullRequest, FileText, Settings2 } from "lucide-react"
import Link from "next/link"

const pendingCommits = [
  {
    id: 1,
    hash: "a3f2c1d",
    message: "Add user authentication system",
    repository: "web-app",
    branch: "feature/auth",
    author: "john-doe",
    timestamp: "2 hours ago",
    filesChanged: 12,
  },
  {
    id: 2,
    hash: "b7e9f4a",
    message: "Fix responsive layout issues on mobile",
    repository: "mobile-ui",
    branch: "fix/responsive",
    author: "jane-smith",
    timestamp: "4 hours ago",
    filesChanged: 8,
  },
  {
    id: 3,
    hash: "c1d8e2b",
    message: "Update API documentation with new endpoints",
    repository: "api-docs",
    branch: "docs/api-update",
    author: "dev-team",
    timestamp: "1 day ago",
    filesChanged: 5,
  },
  {
    id: 4,
    hash: "d9a3f7c",
    message: "Optimize database query performance",
    repository: "backend",
    branch: "perf/db-optimization",
    author: "db-admin",
    timestamp: "1 day ago",
    filesChanged: 15,
  },
]

export function DashboardContent() {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commits Ready for PR</h1>
          <p className="text-muted-foreground mt-1">Select a commit to create a Pull Request with AI assistance</p>
        </div>
        <Link href="/settings/templates">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings2 className="h-4 w-4" />
            PR Templates
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {pendingCommits.map((commit) => (
          <Card key={commit.id} className="hover:border-primary transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <GitCommit className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded">{commit.hash}</code>
                      <Badge variant="outline" className="text-xs">
                        {commit.repository}
                      </Badge>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{commit.branch}</span>
                    </div>
                    <p className="font-medium text-balance">{commit.message}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{commit.author}</span>
                      <span>•</span>
                      <span>{commit.timestamp}</span>
                      <span>•</span>
                      <span>{commit.filesChanged} files changed</span>
                    </div>
                  </div>
                </div>
                <Link href={`/pr-editor?commit=${commit.hash}`}>
                  <Button className="gap-2">
                    <GitPullRequest className="h-4 w-4" />
                    Create PR
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">Customize PR Templates</CardTitle>
          <CardDescription>Create custom report templates for your AI-generated Pull Requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/settings/templates">
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              Manage Templates
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
