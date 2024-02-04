"use client"

import React, { useEffect } from 'react';
import "../../globals.css";
import { signIn } from 'next-auth/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../MemoryStorage';

export default function AuthLoginSuccess() {
  const username = Cookies.get("username").replace(/\+/g, ' ');
  const csrf = Cookies.get("csrf");
  const { setCsrf, setLoginType } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    setCsrf(csrf);
    setLoginType("oauth");
    signIn('credentials', {
      username: username,
      redirect: false,
    }).then(() => {
      Cookies.remove("username");
      Cookies.remove("csrf");
      router.push('/');
    });
  }, [csrf, setCsrf, setLoginType, username, router]);
  return <p>Successfully logged in!</p>;
}