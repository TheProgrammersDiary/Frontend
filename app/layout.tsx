import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import MemoryStorage from "../redux/MemoryStorage";
import ClientLayout from "./ClientLayout";
import RefreshToken from "./refreshToken";

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
  return (
    <html lang="en">
      <MemoryStorage>
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
      </MemoryStorage>
    </html>
  )
}