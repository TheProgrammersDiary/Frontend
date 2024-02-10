'use client'

import { useEffect } from "react";
import { blogUrl } from "../next.config";
import { setJwt, setUsername } from "../redux/actions";
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
          const json = await response.json();
          dispatch(setJwt(json.jwtShortLived));
          dispatch(setUsername(json.username));
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
