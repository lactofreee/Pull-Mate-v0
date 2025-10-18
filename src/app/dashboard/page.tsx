import { Header } from "@/src/components/header";
import { Sidebar } from "@/src/components/sidebar";
import { DashboardContent } from "@/src/features/dashboard/components/dashboard-content";

export default function DashboardPage() {
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
