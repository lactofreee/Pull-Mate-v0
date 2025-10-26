
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GitCommit,
  GitPullRequest,
  Star,
  GitFork,
  Lock,
  Unlock,
  ExternalLink,
  ArrowLeft,
  Settings,
  GitBranch,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useMemo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const repositoryData: Record<string, any> = {
  "1": {
    id: 1,
    name: "web-app",
    fullName: "company/web-app",
    description: "Main web application with React and TypeScript",
    isPrivate: false,
    stars: 124,
    forks: 23,
    language: "TypeScript",
    lastActivity: "2 hours ago",
    url: "https://github.com/company/web-app",
    defaultBranch: "main",
  },
  "2": {
    id: 2,
    name: "mobile-ui",
    fullName: "company/mobile-ui",
    description: "React Native mobile application UI components",
    isPrivate: true,
    stars: 45,
    forks: 8,
    language: "JavaScript",
    lastActivity: "1 day ago",
    url: "https://github.com/company/mobile-ui",
    defaultBranch: "main",
  },
  "3": {
    id: 3,
    name: "api-backend",
    fullName: "company/api-backend",
    description: "Node.js REST API backend with Express and MongoDB",
    isPrivate: true,
    stars: 67,
    forks: 12,
    language: "JavaScript",
    lastActivity: "3 days ago",
    url: "https://github.com/company/api-backend",
    defaultBranch: "main",
  },
}

const recentCommits: Record<string, any[]> = {
  "1": [
    {
      id: 1,
      hash: "a3f2c1d",
      message: "Add user authentication system",
      branch: "feature/auth",
      author: "john-doe",
      timestamp: "2 hours ago",
      filesChanged: 12,
    },
    {
      id: 2,
      hash: "b7e9f4a",
      message: "Fix responsive layout issues on mobile",
      branch: "fix/responsive",
      author: "jane-smith",
      timestamp: "4 hours ago",
      filesChanged: 8,
    },
    {
      id: 3,
      hash: "c1d8e2b",
      message: "Update API documentation with new endpoints",
      branch: "docs/api-update",
      author: "dev-team",
      timestamp: "1 day ago",
      filesChanged: 5,
    },
    {
      id: 4,
      hash: "m5n2p8q",
      message: "Merge feature branch into main",
      branch: "main",
      author: "john-doe",
      timestamp: "2 days ago",
      filesChanged: 20,
    },
    {
      id: 5,
      hash: "r9s4t7u",
      message: "Update dependencies",
      branch: "main",
      author: "dependabot",
      timestamp: "3 days ago",
      filesChanged: 3,
    },
  ],
  "2": [
    {
      id: 1,
      hash: "d9a3f7c",
      message: "Optimize database query performance",
      branch: "perf/db-optimization",
      author: "db-admin",
      timestamp: "1 day ago",
      filesChanged: 15,
    },
    {
      id: 2,
      hash: "k3l7m2n",
      message: "Add new UI components",
      branch: "main",
      author: "ui-dev",
      timestamp: "2 days ago",
      filesChanged: 8,
    },
  ],
  "3": [
    {
      id: 1,
      hash: "e4b8c2a",
      message: "Implement rate limiting middleware",
      branch: "feature/rate-limit",
      author: "backend-dev",
      timestamp: "3 hours ago",
      filesChanged: 6,
    },
    {
      id: 2,
      hash: "f7d3a9b",
      message: "Add MongoDB connection pooling",
      branch: "perf/connection-pool",
      author: "db-admin",
      timestamp: "1 day ago",
      filesChanged: 4,
    },
    {
      id: 3,
      hash: "g2e5c1d",
      message: "Update Express to v5.0",
      branch: "deps/express-update",
      author: "backend-dev",
      timestamp: "2 days ago",
      filesChanged: 18,
    },
    {
      id: 4,
      hash: "h8f4b3e",
      message: "Add request validation schemas",
      branch: "feature/validation",
      author: "api-team",
      timestamp: "2 days ago",
      filesChanged: 9,
    },
    {
      id: 5,
      hash: "i3g7d2f",
      message: "Implement error logging service",
      branch: "feature/logging",
      author: "devops",
      timestamp: "3 days ago",
      filesChanged: 7,
    },
    {
      id: 6,
      hash: "j4k8l3m",
      message: "Production hotfix for API timeout",
      branch: "main",
      author: "backend-dev",
      timestamp: "4 days ago",
      filesChanged: 2,
    },
  ],
}

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

export function RepositoryContent() {
  const params = useParams()
  const repoId = params.id as string
  const repository = repositoryData[repoId]
  const commits = recentCommits[repoId] || []

  const [baseBranch, setBaseBranch] = useState<string>(repository?.defaultBranch || "main")
  const [headBranch, setHeadBranch] = useState<string>("")

  const branches = Array.from(new Set(commits.map((c) => c.branch)))

  const comparisonCommits = useMemo(() => {
    if (!headBranch || headBranch === baseBranch) {
      return []
    }

    // Find commits that are in head branch but not in base branch
    // In a real implementation, this would use git diff/log
    return commits.filter((c) => c.branch === headBranch)
  }, [baseBranch, headBranch, commits])

  const totalFilesChanged = comparisonCommits.reduce((sum, commit) => sum + commit.filesChanged, 0)

  if (!repository) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Repository not found</h2>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                {repository.isPrivate ? (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Unlock className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <CardTitle className="text-2xl">{repository.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{repository.fullName}</p>
                </div>
              </div>
              <CardDescription className="text-pretty">{repository.description}</CardDescription>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className={`h-3 w-3 rounded-full ${getLanguageColor(repository.language)}`} />
                  <span className="text-muted-foreground">{repository.language}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  {repository.stars}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <GitFork className="h-4 w-4" />
                  {repository.forks}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <GitBranch className="h-4 w-4" />
                  {repository.defaultBranch}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={repository.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="commits" className="w-full">
        <TabsList>
          <TabsTrigger value="commits">Compare Branches</TabsTrigger>
          <TabsTrigger value="prs">Pull Requests</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="commits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compare Changes</CardTitle>
              <CardDescription>Select base and head branches to compare and create a pull request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Base Branch</label>
                  <Select value={baseBranch} onValueChange={setBaseBranch}>
                    <SelectTrigger>
                      <GitBranch className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Select base branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-center pt-6">
                  <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Head Branch</label>
                  <Select value={headBranch} onValueChange={setHeadBranch}>
                    <SelectTrigger>
                      <GitBranch className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Select head branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Select a branch</SelectItem>
                      {branches
                        .filter((branch) => branch !== baseBranch)
                        .map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {headBranch && headBranch !== baseBranch ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Commits to be merged</h2>
                  <p className="text-sm text-muted-foreground">
                    {comparisonCommits.length} commit{comparisonCommits.length !== 1 ? "s" : ""} • {totalFilesChanged}{" "}
                    file{totalFilesChanged !== 1 ? "s" : ""} changed
                  </p>
                </div>
                {comparisonCommits.length > 0 && (
                  <Link
                    href={`/pr-editor?base=${baseBranch}&head=${headBranch}&repo=${repository.id}&commits=${comparisonCommits.length}`}
                  >
                    <Button size="lg" className="gap-2">
                      <GitPullRequest className="h-5 w-5" />
                      Create Pull Request
                    </Button>
                  </Link>
                )}
              </div>

              <div className="space-y-3">
                {comparisonCommits.length > 0 ? (
                  comparisonCommits.map((commit) => (
                    <Card key={commit.id} className="hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <GitCommit className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded">{commit.hash}</code>
                              <Badge variant="outline" className="text-xs">
                                {commit.branch}
                              </Badge>
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
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                      <GitCommit className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No Differences Found</h3>
                      <p className="text-sm text-muted-foreground">
                        The selected branches have no differences. Try selecting different branches.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <GitBranch className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Select Branches to Compare</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a base branch and a head branch to see the commits that will be included in the pull request
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="prs" className="space-y-4">
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <GitPullRequest className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No Pull Requests Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Create your first Pull Request by comparing branches</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No Activity Yet</h3>
              <p className="text-sm text-muted-foreground">
                Activity will appear here once you start creating Pull Requests
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
