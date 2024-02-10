"use client"

import React, { useEffect } from 'react';
import "../../globals.css";
import { signIn } from 'next-auth/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setJwt, setLoginType } from '../../redux/actions';

export default function AuthLoginSuccess() {
  const dispatch = useDispatch();
  const username = Cookies.get("username").replace(/\+/g, ' ');
  const jwt = Cookies.get("jwtShortLived");
  const router = useRouter();
  useEffect(() => {
    dispatch(setJwt(jwt));
    dispatch(setLoginType("oauth"));
    signIn('credentials', {
      username: username,
      redirect: false,
    }).then(() => {
      Cookies.remove("username");
      Cookies.remove("jwtShortLived");
      router.push('/');
    });
  }, [jwt, setJwt, setLoginType, username, router]);
  return <p>Successfully logged in!</p>;
}