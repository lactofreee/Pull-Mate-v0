import { formatLastActivity } from "@/app/utils/format-last-activity";
import { Octokit } from "@octokit/rest";
import { CommitInfo } from "../../../types/repos";

export function getOctokit(token: string) {
  return new Octokit({ auth: token });
}

// 인증된 사용자 정보 조회
export async function getAuthenticatedUser(token: string) {
  try {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.users.getAuthenticated();
    return data;
  } catch (error) {
    console.error("❌ getAuthenticatedUser error:", error);
    return null;
  }
}

// 인증된 사용자 레포 조회
export async function getUserRepos(
  token: string,
  options?: { per_page?: number }
) {
  const octokit = getOctokit(token);
  const res = await octokit.repos.listForAuthenticatedUser({
    sort: "updated",
    per_page: options?.per_page ?? 100,
  });
  return res.data;
}

// 특정 레포 상세 조회
export async function getRepo(token: string, owner: string, repo: string) {
  const octokit = getOctokit(token);
  const res = await octokit.repos.get({ owner, repo });
  return res.data;
}

// 특정 레포 브랜치 목록 조회
export async function getRepoBranches(
  token: string,
  owner: string,
  repo: string
) {
  try {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.repos.listBranches({
      owner,
      repo,
    });
    return data;
  } catch (error) {
    console.error(`❌ getRepoBranches error (${repo}):`, error);
    return [];
  }
}

// 브랜치 간 커밋 비교
export async function compareBranches(
  token: string,
  owner: string,
  repo: string,
  base: string,
  head: string
) {
  try {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.repos.compareCommits({
      owner,
      repo,
      base,
      head,
    });
    return data;
  } catch (error) {
    console.error(
      `❌ compareBranches error (${repo}:${base} → ${head}):`,
      error
    );
    return null;
  }
}

// 특정 레포 커밋 조회 및 커스텀 리턴
export async function getRepoCommits(
  token: string,
  owner: string,
  repo: string,
  username: string
): Promise<CommitInfo[]> {
  try {
    const octokit = new Octokit({ auth: token });

    const { data: repoData } = await octokit.repos.get({ owner, repo });
    const defaultBranch = repoData.default_branch;
    const { data: commits } = await octokit.repos.listCommits({
      owner,
      repo,
      author: username,
      per_page: 10,
    });

    const detailedCommits = await Promise.all(
      commits.map(async (commit, index) => {
        const detail = await safeOctokitCall(() =>
          octokit.repos.getCommit({
            owner,
            repo,
            ref: commit.sha,
          })
        );

        const filesChanged = detail?.data.files?.length ?? 0;
        const branch = commit.commit?.tree?.url?.includes(defaultBranch)
          ? defaultBranch
          : defaultBranch;

        const timestamp = formatLastActivity(commit.commit.author?.date ?? "");

        return {
          id: index + 1,
          hash: commit.sha.substring(0, 7),
          message: commit.commit.message,
          branch,
          author: commit.commit.author?.name || username,
          timestamp,
          filesChanged,
          url: commit.html_url,
        };
      })
    );

    return detailedCommits;
  } catch (error) {
    console.error("❌ getRepoCommits error:", error);
    return [];
  }
}

// 에러 처리를 공통 로직
export async function safeOctokitCall<T>(
  fn: () => Promise<T>
): Promise<T | null> {
  try {
    return await fn();
  } catch (err) {
    console.error("Octokit API 호출 실패", err);
    return null;
  }
}
