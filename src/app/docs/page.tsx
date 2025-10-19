import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DocsContent } from "@/components/docs-content";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <aside className="hidden w-64 border-r bg-sidebar md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <DocsContent />
        </main>
      </div>
    </div>
  );
}
