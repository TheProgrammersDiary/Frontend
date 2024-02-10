"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../globals.css";
import Link from "next/link";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

export default function ClientLayout(): React.ReactNode {
    const jwt = useSelector((state: AppState) => state.jwt);
    return (
        <>
            {jwt ?
                <div className="flex items-center">
                    <Link href="/account" className="px-8">
                        <FontAwesomeIcon icon={faUser} style={{ color: "white", fontSize: 36 }} />
                    </Link>
                    <Link href="/logout" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                        Logout
                    </Link>
                </div>
                :
                <Link href="/login" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Login
                </Link>
            }
        </>
    );
}