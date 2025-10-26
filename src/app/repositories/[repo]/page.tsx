import { RepositoryDetailContent } from "@/features/repository/components/repository-detail-content";
import {
  getRepo,
  getRepoBranches,
  getSingleBranchCommits,
} from "@/lib/github/octokit";
import { GitHubRepo, Repository } from "../../../../types/repos";
import { getSessionUser } from "@/lib/auth/getSessionUser";
import { RepositoryContent } from "@/features/repository/components/repository-content";

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

  if (!token) {
    return <div>로그인 후 사용해주세요.</div>;
  }

  const username = session.user?.github?.login ?? "";
  if (!username) {
    return <div>GitHub 사용자 정보를 확인할 수 없습니다.</div>;
  }

  const authProps = { token, username };
  const repoName = params.repo;

  const repo = await getRepo(token, username, repoName);
  const owner = repo.owner.login;

  const formattedRepo = transformRepoData(repo);
  const defaultBranch = formattedRepo.defaultBranch;

  const [initialCommits, branches] = await Promise.all([
    getSingleBranchCommits(token, owner, repoName, username, defaultBranch!),
    getRepoBranches(token, owner, repoName),
  ]);

  const branchArr = branches.map((branch) => branch.name);

  return (
    // <RepositoryContent />
    <RepositoryDetailContent
      authProps={authProps}
      repositoryProps={formattedRepo}
      initialCommits={initialCommits}
      branchProps={branchArr}
    />
    // <div>daw</div>
  );
}
