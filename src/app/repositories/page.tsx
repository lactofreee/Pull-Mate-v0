import { Header } from "@/src/components/header";
import { Sidebar } from "@/src/components/sidebar";
import { RepositoriesContent } from "@/src/components/repositories-content";

export default function RepositoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <aside className="hidden w-64 border-r bg-sidebar md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <RepositoriesContent />
        </main>
      </div>
    </div>
  );
}
