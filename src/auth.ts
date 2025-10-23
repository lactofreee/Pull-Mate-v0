import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { getAuthenticatedUser } from "@/lib/github/octokit";

const GITHUB_SCOPES = "repo read:user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: { params: { scope: GITHUB_SCOPES } },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;

        const githubUser = await getAuthenticatedUser(account.access_token);

        if (githubUser) {
          token.github = {
            login: githubUser.login,
            html_url: githubUser.html_url,
            bio: githubUser.bio,
            followers: githubUser.followers,
            following: githubUser.following,
            public_repos: githubUser.public_repos,
          };
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }

      session.user = {
        ...session.user,
        github: token.github,
      };

      return session;
    },
  },
});
