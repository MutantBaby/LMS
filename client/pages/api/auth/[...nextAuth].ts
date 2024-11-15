import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
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
};

export default NextAuth(authOptions);
