"use client"

import "../../globals.css";
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import {blogUrl} from "../../next.config.js";
import { useRouter } from 'next/navigation.js';
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

export default function Logout() {
    const { csrf } = useSelector((state: AppState) => state);
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