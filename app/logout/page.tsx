"use client"

import "../../globals.css";
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import {blogUrl} from "../../next.config.js";
import { useRouter } from 'next/navigation.js';
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

export default function Logout() {
    const jwt = useSelector((state: AppState) => state.jwt);
    const router = useRouter();
    useEffect(() => {
        const effect = async () => {
            await fetch(
                blogUrl + "/users/logout",
                {
                    method: "POST",
                    credentials: "omit",
                    headers: {"Authorization": "Bearer " + jwt}
                }
            ).then(_ => {
                signOut({redirect: false});
                router.push("/");
            });
        }
        effect();
    }, []);
}