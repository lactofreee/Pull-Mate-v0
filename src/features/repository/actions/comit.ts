"use server";
import { getRepoCommits } from "@/lib/github/octokit";

export async function fetchCommitsByBranch(
  token: string,
  owner: string,
  repo: string,
  username: string,
  baseBranch: string,
  targetBranch: string
) {
  const commits = await getRepoCommits(
    token,
    owner,
    repo,
    username,
    baseBranch,
    targetBranch
  );
  return commits;
}
