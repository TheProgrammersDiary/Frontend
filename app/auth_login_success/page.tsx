"use client"

import React, { useEffect } from 'react';
import "../../globals.css";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUsername, setJwt, setLoginType } from '../../redux/actions';

export default function AuthLoginSuccess() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const usernameCookie = Cookies.get("username");
    if (usernameCookie) {
      const username = usernameCookie.replace(/\+/g, ' ');
      const jwt = Cookies.get("jwtShortLived");
      dispatch(setJwt(jwt));
      dispatch(setLoginType("oauth"));
      dispatch(setUsername(username));
      Cookies.remove("username");
      Cookies.remove("jwtShortLived");
      router.push('/');
    }
  }, [dispatch]);
  return <></>;
}