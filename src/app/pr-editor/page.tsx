import { Header } from "@/features/common/header/header";
import { Sidebar } from "@/components/sidebar";
import { PREditorContent } from "@/components/pr-editor-content";
import { getRepoBranches } from "@/lib/github/octokit";
import { getSessionUser } from "@/lib/auth/getSessionUser";

interface PrEditorPageProps {
  searchParams: {
    owner: string | undefined;
    repo: string | undefined;
    base: string | undefined;
    head: string | undefined;
  };
}

export default async function PREditorPage({
  searchParams,
}: PrEditorPageProps) {
  const session = await getSessionUser();
  const token = session?.accessToken;

  if (
    !token ||
    !searchParams.owner ||
    !searchParams.repo ||
    !searchParams.base ||
    !searchParams.head
  ) {
    throw new Error(
      "필수 경로 정보가 누락되었습니다. 경로를 다시 확인해주세요."
    );
  }

  const branches = await getRepoBranches(
    token,
    searchParams.owner!,
    searchParams.repo!
  );

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
