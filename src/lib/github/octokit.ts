import { Octokit } from "@octokit/rest";

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

// 특정 저장소에서 특정 사용자의 커밋 가져오기
export async function getRepoCommits(
  token: string,
  owner: string,
  repo: string,
  username: string
) {
  try {
    const octokit = new Octokit({ auth: token });

    // 최근 10개 커밋 가져오기
    const { data: commits } = await octokit.repos.listCommits({
      owner,
      repo,
      author: username,
      per_page: 10,
    });

    // 각 커밋 상세 정보 가져오기
    const detailedCommits = await Promise.all(
      commits.map(async (commit) => {
        const detail = await safeOctokitCall(() =>
          octokit.repos.getCommit({
            owner,
            repo,
            ref: commit.sha,
          })
        );

        return {
          sha: commit.sha,
          message: commit.commit.message,
          date: commit.commit.author?.date,
          url: commit.html_url,
          files: detail?.data.files ?? [],
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
