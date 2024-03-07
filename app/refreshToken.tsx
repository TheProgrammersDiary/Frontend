"use client"

import { useEffect } from "react";
import { blogUrl } from "../next.config";
import { setJwt, setLoginType, setUsername } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function RefreshToken({ children }: { children: React.ReactNode }): React.ReactNode {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          blogUrl + "/users/refresh",
          { method: "POST", credentials: "include" }
        );
        if (response.ok) {
          const json = await response.json();
          dispatch(setJwt(json.jwtShortLived));
          dispatch(setUsername(json.username));
          console.log("IS LOGIN LOCAL: " + json.isLoginLocal);
          dispatch(setLoginType(json.isLoginLocal ? "local" : "oauth"));
          console.log(json.isLoginLocal ? "local" : "oauth");
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 9 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);
  return <>{children}</>;
}