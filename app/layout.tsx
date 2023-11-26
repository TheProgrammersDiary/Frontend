import { getServerSession } from "next-auth";
import NextAuthProvider from "./NextAuthProvider"
import { Metadata } from "next"
import React from "react"
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: 'Programmers diary',
}

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const session = await getServerSession(authOptions);
    return (
      <html lang="en">
        <NextAuthProvider session={session}>
          <body>{children}</body>
        </NextAuthProvider>
      </html>
    )
  }