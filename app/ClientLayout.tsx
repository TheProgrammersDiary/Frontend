"use client"

import "../globals.css";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ClientLayout(): React.ReactNode {
    const { data: session } = useSession();
    return (
        <>
            {session?.user ?
                <Link href="/logout" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Logout
                </Link>
                :
                <Link href="/login" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Login
                </Link>
            }
        </>
    );
}