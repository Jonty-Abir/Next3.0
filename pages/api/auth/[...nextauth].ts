import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    /***_______  Google Provider   ________**/
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.NEXT_PUBLIC_PREFIX_GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.NEXT_PUBLIC_PREFIX_GOOGLE_CLIENT_SECRET,
    }),
    /***_______  GitHub Provider   ________**/
    GitHubProvider({
      // @ts-ignore
      clientId: process.env.NEXT_PUBLIC_PREFIX_GITHUB_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.NEXT_PUBLIC_PREFIX_GITHUB_CLIENT_SECRET,
    }),
    FacebookProvider({
      //@ts-ignore
      clientId: process.env.NEXT_PUBLIC_PREFIX_FACEBOOK_CLIENT_ID,
      //@ts-ignore
      clientSecret: process.env.NEXT_PUBLIC_PREFIX_FACEBOOK_CLIENT_SECRET,
    }),
  ],
});
