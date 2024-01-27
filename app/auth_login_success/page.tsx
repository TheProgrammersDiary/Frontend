"use client"

import "../../globals.css";
import React, { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../MemoryStorage';

export default function AuthLoginSuccess() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const csrf = searchParams.get('csrf');
  const { setCsrf, setLoginType } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    setCsrf(csrf);
    setLoginType("oauth");
    signIn('credentials', {
      username: username,
      redirect: false,
    }).then(() => {
      router.push('/');
    });
  }, []);

  return <p>Successfully logged in!</p>;
}