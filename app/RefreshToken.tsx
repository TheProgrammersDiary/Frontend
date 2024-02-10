'use client'

import { useEffect, useState } from "react";
import { blogUrl } from "../next.config";
import { setJwt } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function RefreshToken({ children }: { children: React.ReactNode }): React.ReactNode {
  const dispatch = useDispatch();
  useEffect(() => {
    const effect = async () => {
      try {
        const response = await fetch(
          blogUrl + "/users/refresh",
          { method: "POST", credentials: "include" }
        );
        if (response.ok) {
          const jwt = await response.text();
          dispatch(setJwt(jwt));
        }
      } catch (error) {
      }
    };
    effect();
  }, []);
  return (<>
    {children}
  </>);
}
