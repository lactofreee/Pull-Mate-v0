import { auth } from "@/auth";
import { RepositoryDetailContent } from "@/components/repository-detail-content";
import { getRepo, getRepoCommits } from "@/lib/github/octokit";
import { GitHubRepo, Repository } from "../../../../types/repos";
import { getSessionUser } from "@/lib/auth/getSessionUser";

interface RepoPageProps {
  params: { repo: string };
}

export function transformRepoData(repo: GitHubRepo): Repository {
  const updated = repo.updated_at ? new Date(repo.updated_at) : null;
  const now = new Date();

  let lastActivity = "unknown";
  if (updated) {
    const diffMs = now.getTime() - updated.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) lastActivity = "just now";
    else if (diffHours < 24) lastActivity = `${diffHours} hours ago`;
    else lastActivity = `${Math.floor(diffHours / 24)} days ago`;
  }

  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description || null,
    isPrivate: repo.private,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    lastActivity,
    url: repo.html_url,
    owner: repo.owner.login,
    defaultBranch: repo.default_branch,
    isConnected: false,
    notifications: false,
  };
}

export default async function RepositoryDetailPage({ params }: RepoPageProps) {
  const session = await getSessionUser();
  const token = session?.accessToken;
  const repoName = params.repo;

  const repo = await getRepo(token!, "lactofreee", repoName);
  const formattedRepo = transformRepoData(repo);
  const commits = await getRepoCommits(
    token!,
    repo.owner.login,
    repoName,
    session?.user?.github?.login!
  );
  return (
    <RepositoryDetailContent
      repositoryProps={formattedRepo}
      commitsProps={commits}
    />
  );
}
