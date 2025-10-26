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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { CommitInfo, Repository } from "../../../../types/repos";
import { useState, useTransition, useEffect } from "react";
import { fetchCommitsByBranch } from "../actions/fetchCommitsByBranch";

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

interface AuthProps {
  token: string;
  username: string;
}

interface RepositoryDetailContentProps {
  authProps: AuthProps;
  repositoryProps: Repository;
  initialCommits: CommitInfo[];
  branchProps: string[];
  initialHeadBranch: string;
}

export function RepositoryDetailContent({
  authProps,
  repositoryProps,
  initialCommits,
  branchProps,
  initialHeadBranch,
}: RepositoryDetailContentProps) {
  const repository = repositoryProps;
  const { token, username } = authProps;
  const owner = repository.owner;
  const repoName = repository.name;
  const branches = branchProps;

  // 1. 상태 정의 (Base, Head, 커밋 결과)
  const [commits, setCommits] = useState<CommitInfo[]>(initialCommits);
  const [isPending, startTransition] = useTransition();

  const [baseBranch, setBaseBranch] = useState<string>(
    repository.defaultBranch || "main"
  );

  const [headBranch, setHeadBranch] = useState<string>(initialHeadBranch);

  useEffect(() => {
    if (!baseBranch || !headBranch || baseBranch === headBranch) {
      setCommits([]);
      return;
    }

    const DEBOUNCE_DELAY = 300;
    const timeoutId = setTimeout(() => {
      startTransition(async () => {
        try {
          const newCommits = await fetchCommitsByBranch(
            token,
            owner,
            repoName,
            username,
            baseBranch,
            headBranch
          );
          setCommits(newCommits);
        } catch (error) {
          console.error("커밋 조회 실패:", error);
          setCommits([]);
        }
      });
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [baseBranch, headBranch, token, owner, repoName, username]);

  // 3. 💡 커밋 결과는 commits 상태를 직접 사용
  const comparisonCommits = commits;

  const totalFilesChanged = comparisonCommits.reduce(
    (sum, commit) => sum + commit.filesChanged,
    0
  );

  if (!repository) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Repository not found</h2>
          {/* Link 대신 <a> 태그 사용 */}
          <a href="/dashboard">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </a>
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
          <TabsTrigger value="commits">Compare Branches</TabsTrigger>
          <TabsTrigger value="prs">Pull Requests</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="commits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compare Changes</CardTitle>
              <CardDescription>
                Select base and head branches to compare and create a pull
                request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">
                    Base Branch (Merge Target)
                  </label>
                  <Select
                    value={baseBranch}
                    onValueChange={(val) => setBaseBranch(val)}
                    disabled={isPending}
                  >
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
                  <label className="text-sm font-medium mb-2 block">
                    Head Branch (Your Work)
                  </label>
                  <Select
                    value={headBranch}
                    onValueChange={(val) => setHeadBranch(val)}
                    disabled={isPending}
                  >
                    <SelectTrigger>
                      <GitBranch className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Select head branch" />
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
              </div>
            </CardContent>
          </Card>

          {/* 로딩 인디케이터 */}
          {isPending && (
            <Card className="border-dashed animate-pulse">
              <CardContent className="flex items-center justify-center p-12 text-center">
                <p className="text-blue-500">
                  Comparing branches and fetching commits...
                </p>
              </CardContent>
            </Card>
          )}

          {/* 결과 표시 */}
          {!isPending && headBranch && baseBranch ? (
            headBranch !== baseBranch ? (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Commits to be merged
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {comparisonCommits.length} commit
                      {comparisonCommits.length !== 1 ? "s" : ""} •{" "}
                      {totalFilesChanged} file
                      {totalFilesChanged !== 1 ? "s" : ""} changed
                    </p>
                  </div>
                  {comparisonCommits.length > 0 && (
                    <a
                      href={`/pr-editor?base=${baseBranch}&head=${headBranch}&repo=${repository.name}&owner=${repository.owner}&commits=${comparisonCommits.length}`}
                    >
                      <Button size="lg" className="gap-2">
                        <GitPullRequest className="h-5 w-5" />
                        Create Pull Request
                      </Button>
                    </a>
                  )}
                </div>

                <div className="space-y-3">
                  {comparisonCommits.length > 0 ? (
                    comparisonCommits.map((commit) => (
                      <Card
                        key={commit.hash}
                        className="hover:border-primary/50 transition-colors"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
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
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                        <GitCommit className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">
                          No Differences Found
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          The selected branches have no differences. The head
                          branch is up to date with the base branch.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </>
            ) : (
              // Base === Head 일 때
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                  <GitBranch className="h-12 w-12 text-red-500 mb-4" />
                  <h3 className="font-semibold mb-2">
                    Cannot Compare Same Branches
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Please select a different Head Branch to see changes ready
                    for a Pull Request.
                  </p>
                </CardContent>
              </Card>
            )
          ) : (
            // Head 또는 Base가 선택되지 않았을 때
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <GitBranch className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">
                  Select Branches to Compare
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose a base branch and a head branch to see the commits that
                  will be included in the pull request
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
