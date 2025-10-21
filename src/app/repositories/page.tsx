import { Header } from "@/features/common/header/header";
import { Sidebar } from "@/components/sidebar";
import { RepositoriesContent } from "@/components/repositories-content";
import { auth } from "@/auth";
import { getUserRepos, safeOctokitCall } from "@/lib/github/octokit";
import { formatLastActivity } from "../utils/format-last-activity";
import { GitHubRepo, Repo } from "../../../types/repos";

export default async function RepositoriesPage() {
  const session = await auth();
  const token = session?.accessToken;
  const data = token ? await safeOctokitCall(() => getUserRepos(token)) : null;

  const repos: Repo[] =
    data?.map((item: GitHubRepo) => ({
      id: item.id,
      name: item.name,
      fullName: item.full_name,
      description: item.description ?? "",
      isPrivate: item.private,
      stars: item.stargazers_count,
      forks: item.forks_count,
      language: item.language ?? "Unknown",
      lastActivity: item.updated_at
        ? formatLastActivity(item.updated_at)
        : "unknown",
      isConnected: true,
      notifications: true,
      owner: item.owner.login,
      url: item.html_url,
    })) || [];

  console.log(repos);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <aside className="hidden w-64 border-r bg-sidebar md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <RepositoriesContent repos={repos} />
        </main>
      </div>
    </div>
  );
}
