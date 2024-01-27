"use client"

import "../../globals.css";
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import {blogUrl} from "../../next.config.js";
import { useAppContext } from "../MemoryStorage";
import { useRouter } from 'next/navigation.js';

export default function Logout() {
    const { csrf } = useAppContext();
    const router = useRouter();
    useEffect(() => {
        const effect = async () => {
            await fetch(
                blogUrl + "/users/logout",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {"X-CSRF-TOKEN": csrf}
                }
            ).then(_ => {
                signOut({redirect: false});
                router.push("/");
            });
        }
        effect();
    }, []);
}