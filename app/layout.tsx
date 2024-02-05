import { getServerSession } from "next-auth";
import NextAuthProvider from "./NextAuthProvider"
import { Metadata } from "next"
import React from "react"
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import MemoryStorage from "../redux/MemoryStorage";
import ClientLayout from "./ClientLayout";

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
          </NextAuthProvider>
        </MemoryStorage>
    </html>
  )
}