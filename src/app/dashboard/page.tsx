import { Header } from "@/features/common/header/header";
import { Sidebar } from "@/components/sidebar";
import { DashboardContent } from "@/features/dashboard/components/dashboard-content";
import HomePage from "@/components/test";

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <aside className="hidden w-64 border-r bg-sidebar md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          {/* <HomePage /> */}
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
