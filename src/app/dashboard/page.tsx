import { Header } from "@/features/common/header/header";
import { Sidebar } from "@/components/sidebar";
import { DashboardContent } from "@/features/dashboard/components/dashboard-content";
import { auth } from "@/auth";
import { getUserRepos, safeOctokitCall } from "@/lib/github/octokit";

export default async function DashboardPage() {
  // const session = await auth();
  // const token = session?.accessToken;
  // const repos = token ? await safeOctokitCall(() => getUserRepos(token)) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <aside className="hidden w-64 border-r bg-sidebar md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
