import { Header } from "@/src/components/header";
import { Sidebar } from "@/src/components/sidebar";
import { ActivityLogContent } from "@/src/features/activity/components/activity-log-content";

export default function ActivityLogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <aside className="hidden w-64 border-r bg-sidebar md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <ActivityLogContent />
        </main>
      </div>
    </div>
  );
}
