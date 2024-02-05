"use client"

import React, { useEffect } from 'react';
import "../../globals.css";
import { signIn } from 'next-auth/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCsrf, setLoginType } from '../../redux/actions';

export default function AuthLoginSuccess() {
  const dispatch = useDispatch();
  const username = Cookies.get("username").replace(/\+/g, ' ');
  const csrf = Cookies.get("csrf");
  const router = useRouter();
  useEffect(() => {
    dispatch(setCsrf(csrf));
    dispatch(setLoginType("oauth"));
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