"use client"
 
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation'

export default function AuthLoginSuccess() {
    const searchParams = useSearchParams();
    const username = searchParams.get("username");
    const expirationDate = searchParams.get("expirationDate");
    signIn('credentials',
        { callbackUrl: '/', username: username, expiration: expirationDate}
    );
    return (<p>Successfully logged in!</p>);
}