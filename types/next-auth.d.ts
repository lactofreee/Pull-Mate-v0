import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: DefaultSession["user"] & {
      github?: {
        login?: string;
        html_url?: string;
        bio?: string | null;
        followers?: number;
        following?: number;
        public_repos?: number;
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    github?: {
      login?: string;
      html_url?: string;
      bio?: string | null;
      followers?: number;
      following?: number;
      public_repos?: number;
    };
  }
}
