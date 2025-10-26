import { getRepoCommits } from "@/lib/github/octokit";

export async function fetchCommitsByBranch(
  token: string,
  owner: string,
  repoName: string,
  username: string,
  baseBranch: string,
  headBranch: string
) {
  const comparisonResult = await getRepoCommits(
    token,
    owner,
    repoName,
    username,
    baseBranch,
    headBranch
  );
  
  console.log(
    `[Server Action] Fetching commits between ${baseBranch} and ${headBranch}`
  );

  return comparisonResult;
}
