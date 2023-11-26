"use client"

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

export default function Logout() {
    useEffect(() => {
        const effect = async () => {
            await fetch(
                "http://localhost:8080/users/logout",
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