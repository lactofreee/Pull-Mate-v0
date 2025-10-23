"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import Link from "next/link";
import { CommitInfo, Repository } from "../../types/repos";

function getLanguageColor(language: string) {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-500",
    MDX: "bg-purple-500",
    Python: "bg-green-500",
    Go: "bg-cyan-500",
  };
  return colors[language] || "bg-gray-500";
}

export function RepositoryDetailContent({
  repositoryProps,
  commitsProps,
}: {
  repositoryProps: Repository;
  commitsProps: CommitInfo[];
}) {
  const repository = repositoryProps;
  const commits = commitsProps || [];

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
    );
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
                  <p className="text-sm text-muted-foreground">
                    {repository.fullName}
                  </p>
                </div>
              </div>
              <CardDescription className="text-pretty">
                {repository.description}
              </CardDescription>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div
                    className={`h-3 w-3 rounded-full ${getLanguageColor(
                      repository.language || ""
                    )}`}
                  />
                  <span className="text-muted-foreground">
                    {repository.language}
                  </span>
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
                <a
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="commits" className="w-full">
        <TabsList>
          <TabsTrigger value="commits">Recent Commits</TabsTrigger>
          <TabsTrigger value="prs">Pull Requests</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="commits" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Recent Commits</h2>
              <p className="text-sm text-muted-foreground">
                {commits.length} commit{commits.length !== 1 ? "s" : ""} ready
                for Pull Request
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {commits.map((commit) => (
              <Card
                key={commit.id}
                className="hover:border-primary transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <GitCommit className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded">
                            {commit.hash}
                          </code>
                          <Badge variant="outline" className="text-xs">
                            {commit.branch}
                          </Badge>
                        </div>
                        <p className="font-medium text-balance">
                          {commit.message}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{commit.author}</span>
                          <span>•</span>
                          <span>{commit.timestamp}</span>
                          <span>•</span>
                          <span>{commit.filesChanged} files changed</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/pr-editor?commit=${commit.hash}&repo=${repository.id}`}
                    >
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
        </TabsContent>

        <TabsContent value="prs" className="space-y-4">
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <GitPullRequest className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No Pull Requests Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first Pull Request from a recent commit
              </p>
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
  );
}
