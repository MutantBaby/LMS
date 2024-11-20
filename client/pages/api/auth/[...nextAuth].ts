import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.Github_CLIENT_ID as string,
      clientSecret: process.env.Github_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.AUTH_SECRET as string,
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (account?.provider !== "github") return true;

      try {
        const response = await fetch(
          "https://api.github.com/user/public_emails",
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `token ${account.access_token}`,
            },
          }
        );

        if (!response.ok) {
          console.error(
            `Failed to fetch public emails from GitHub: ${response.status} - ${response.statusText}`
          );
          return false;
        }

        const emails = await response.json();

        if (Array.isArray(emails) && emails.length > 0) {
          const primaryEmail =
            emails.find((email) => email.primary)?.email || emails[0].email;

          if (primaryEmail) {
            profile!.email = primaryEmail;
            user.email = primaryEmail;
          }
        }
      } catch (error) {
        console.error("Error fetching GitHub public emails:", error);
        return false;
      }

      return true;
    },
  },
};

export default NextAuth(authOptions);
