import { Header } from "@/src/components/header";
import { Sidebar } from "@/src/components/sidebar";
import { SettingsContent } from "@/src/components/settings-content";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <aside className="hidden w-64 border-r bg-sidebar md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <SettingsContent />
        </main>
      </div>
    </div>
  );
}
