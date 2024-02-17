"use client"

import React, { useEffect } from 'react';
import "../../globals.css";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUsername, setJwt, setLoginType } from '../../redux/actions';

export default function AuthLoginSuccess() {
  const dispatch = useDispatch();
  useEffect(() => {
    const username = Cookies.get("username").replace(/\+/g, ' ');
    const jwt = Cookies.get("jwtShortLived");
    const router = useRouter();
    dispatch(setJwt(jwt));
    dispatch(setLoginType("oauth"));
    dispatch(setUsername(username));
    Cookies.remove("username");
    Cookies.remove("jwtShortLived");
    router.push('/');
  }, [dispatch]);
  return <p>Successfully logged in!</p>;
}