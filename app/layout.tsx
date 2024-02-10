import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import MemoryStorage from "../redux/MemoryStorage";
import ClientLayout from "./ClientLayout";
import NextAuthProvider from "./NextAuthProvider";
import RefreshToken from "./RefreshToken";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: 'Programmers diary',
  icons: {
    icon: "/favicon.ico"
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <MemoryStorage>
        <NextAuthProvider session={session}>
          <RefreshToken>
            <body>
              <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-2">
                <Link href="/" className="flex items-center flex-shrink-0 text-white mr-10">
                  <img src="/favicon.ico" className="h-10" alt="Programmers' diary logo" />
                  <span className="font-semibold text-xl tracking-tight">Programmers' diary</span>
                </Link>
                <ClientLayout />
              </nav>
              {children}
            </body>
          </RefreshToken>
        </NextAuthProvider>
      </MemoryStorage>
    </html>
  )
}