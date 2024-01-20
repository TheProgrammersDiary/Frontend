"use client"

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import {blogUrl} from "../../next.config.js";

export default function Logout() {
    useEffect(() => {
        const effect = async () => {
            await fetch(
                blogUrl + "/users/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            ).then(_ => {
                signOut({callbackUrl: '/'});
            });
        }
        effect();
    }, []);
}