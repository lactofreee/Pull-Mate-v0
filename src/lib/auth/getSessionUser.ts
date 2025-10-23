import { auth } from "@/auth";
import type { Session } from "next-auth";

export async function getSessionUser(): Promise<Session | null> {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("❌ getSessionUser error:", error);
    return null;
  }
}
