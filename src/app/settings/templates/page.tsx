import { Header } from "@/src/components/header";
import { Sidebar } from "@/src/components/sidebar";
import { TemplateEditor } from "@/src/components/template-editor";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <aside className="hidden w-64 border-r bg-sidebar md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <TemplateEditor />
        </main>
      </div>
    </div>
  );
}
