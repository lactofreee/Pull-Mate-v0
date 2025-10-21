import { Header } from "@/features/common/header/header";
import { Sidebar } from "@/components/sidebar";
import { PREditorContent } from "@/components/pr-editor-content";

export default function PREditorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <aside className="hidden w-64 border-r bg-sidebar md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <PREditorContent />
        </main>
      </div>
    </div>
  );
}
