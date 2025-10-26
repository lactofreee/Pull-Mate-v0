import { auth } from "@/auth";
import { RepositoryDetailContent } from "@/components/repository-detail-content";
import { getRepo, getRepoBranches, getRepoCommits, getSingleBranchCommits } from "@/lib/github/octokit";
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
  if (!token) return <div>로그인 후 사용해주세요.</div>;

  const username = session?.user?.github?.login;
  const authProps = {
    token: token,
    username: session?.user?.github?.login,
  };
  const repoName = params.repo;

  const repo = await getRepo(token!, "lactofreee", repoName);
  const owner = repo.owner.login;

  const formattedRepo = transformRepoData(repo);
  const initialCommits = await getSingleBranchCommits(
    token!,
    repo.owner.login,
    repoName,
    session?.user?.github?.login!,
    formattedRepo.defaultBranch!
  );
  const branches = await getRepoBranches(token!, owner, repoName);

  // const commits = await getRepoCommits(
  //   token!,
  //   owner,
  //   repoName,
  //   session?.user?.github?.login!
  // );

  const branchArr = branches.map((branch) => branch.name);
  console.log(branchArr);
  return (
    <RepositoryDetailContent
      authProps={authProps}
      repositoryProps={formattedRepo}
      initialCommits={initialCommits}
      branchProps={branchArr}
    />
  );
}


// base branch와 target branch를 사용자가 선택할 수 있게 ui 수정
// 선택한 브랜치 관계 기반으로 pr가능한 커밋 보여주기
// 해당 커밋 선택하면 pr 작성 화면으로 전환