import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: "username",
          type: "input"
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return {id: "-1", name: credentials.username};
      },
    }),
  ],
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };