import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    /***_______  Google Provider   ________**/
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_PREFIX_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env
        .NEXT_PUBLIC_PREFIX_GOOGLE_CLIENT_SECRET as string,
    }),
    /***_______  GitHub Provider   ________**/
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_PREFIX_GITHUB_CLIENT_ID as string,
      clientSecret: process.env
        .NEXT_PUBLIC_PREFIX_GITHUB_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_PREFIX_FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env
        .NEXT_PUBLIC_PREFIX_FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
});
