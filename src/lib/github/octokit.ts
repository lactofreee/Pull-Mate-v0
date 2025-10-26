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
// export async function getRepoCommits(
//   token: string,
//   owner: string,
//   repo: string,
//   username: string,
//   targetBranch: string
// ): Promise<CommitInfo[]> {
//   try {
//     const octokit = new Octokit({ auth: token });

//     const { data: repoData } = await octokit.repos.get({ owner, repo });
//     const defaultBranch = repoData.default_branch;
//     const { data: commits } = await octokit.repos.listCommits({
//       owner,
//       repo,
//       author: username,
//       per_page: 10,
//     });

//     const detailedCommits = await Promise.all(
//       commits.map(async (commit, index) => {
//         const detail = await safeOctokitCall(() =>
//           octokit.repos.getCommit({
//             owner,
//             repo,
//             ref: commit.sha,
//           })
//         );

//         const filesChanged = detail?.data.files?.length ?? 0;
//         const branch = commit.commit?.tree?.url?.includes(defaultBranch)
//           ? defaultBranch
//           : defaultBranch;

//         const timestamp = formatLastActivity(commit.commit.author?.date ?? "");

//         return {
//           id: index + 1,
//           hash: commit.sha.substring(0, 7),
//           message: commit.commit.message,
//           branch,
//           author: commit.commit.author?.name || username,
//           timestamp,
//           filesChanged,
//           url: commit.html_url,
//         };
//       })
//     );

//     return detailedCommits;
//   } catch (error) {
//     console.error("❌ getRepoCommits error:", error);
//     return [];
//   }
// }

// 단일 브랜치 커밋 정보 조회
export async function getSingleBranchCommits(
  token: string,
  owner: string,
  repo: string,
  username: string,
  targetBranch: string // 👈 조회할 브랜치 이름
): Promise<CommitInfo[]> {
  // 이 함수는 단순히 해당 브랜치의 최신 커밋 10개를 가져오는 데 사용됩니다.
  try {
    const octokit = new Octokit({ auth: token });

    const { data: commits } = await octokit.repos.listCommits({
      owner,
      repo,
      sha: targetBranch, // 💡 해당 브랜치로 조회 범위를 제한
      per_page: 10,
    });

    // ... (이후 detailedCommits 매핑 로직은 getRepoCommits에서 가져와 재사용)
    // 매핑 로직에서는 branch 값을 branchName으로 할당합니다.
    // ...

    const detailedCommits = await Promise.all(
      commits.map(async (commit, index) => {
        // 3. 커밋 상세 정보 조회 (파일 변경 정보 포함)
        const detail = await safeOctokitCall(() =>
          octokit.repos.getCommit({
            owner,
            repo,
            ref: commit.sha,
          })
        );

        const filesChanged = detail?.data.files?.length ?? 0;

        // 4. 브랜치 정보 할당: 이 커밋은 targetBranch에 고유한 것으로 간주합니다.
        const branch = targetBranch;

        // 5. 타임스탬프 포맷팅
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
    console.error(
      `❌ getSingleBranchCommits for ${targetBranch} error:`,
      error
    );
    return [];
  }
}

// default가 아닌 브랜치 정보 조회
export async function getRepoCommits(
  token: string,
  owner: string,
  repo: string,
  username: string,
  baseBranch: string,
  targetBranch: string
): Promise<CommitInfo[]> {
  try {
    const octokit = new Octokit({ auth: token });

    const { data } = await octokit.repos.compareCommits({
      owner,
      repo,
      base: baseBranch,
      head: targetBranch,
    });

    const uniqueCommits = data.commits
      .filter((commit) => commit.commit)
      .slice(-10)
      .reverse();

    const detailedCommits = await Promise.all(
      uniqueCommits.map(async (commit, index) => {
        const detail = await safeOctokitCall(() =>
          octokit.repos.getCommit({
            owner,
            repo,
            ref: commit.sha,
          })
        );

        const filesChanged = detail?.data.files?.length ?? 0;
        const branch = targetBranch;

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
    console.error(
      `❌ getRepoCommits (Comparison) error between ${baseBranch} and ${targetBranch}:`,
      error
    );
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

// PR 생성 로직
interface CreatePullRequestParams {
  token: string;
  owner: string;
  repo: string;
  title: string;
  head: string; // 병합할 브랜치 (ex. feature/login)
  base: string; // 대상 브랜치 (ex. main)
  body?: string;
}

export async function createPullRequest({
  token,
  owner,
  repo,
  title,
  head,
  base,
  body,
}: CreatePullRequestParams) {
  try {
    const octokit = new Octokit({ auth: token });

    const response = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
      owner,
      repo,
      title,
      head,
      base,
      body,
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("PR 생성 실패:", error.message);
    } else {
      console.error("예상치 못한 에러:", error);
    }
    throw new Error("Failed to create pull request");
  }
}
