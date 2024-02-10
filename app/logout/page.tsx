"use client"

import "../../globals.css";
import { useEffect } from 'react';
import {blogUrl} from "../../next.config.js";
import { useRouter } from 'next/navigation.js';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { setJwt, setLoginType, setUsername } from "../../redux/actions";

export default function Logout() {
    const dispatch = useDispatch();
    const jwt = useSelector((state: AppState) => state.jwt);
    const router = useRouter();
    useEffect(() => {
        const effect = async () => {
            await fetch(
                blogUrl + "/users/logout",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {"Authorization": "Bearer " + jwt}
                }
            ).then(_ => {
                dispatch(setJwt(null));
                dispatch(setLoginType(null));
                dispatch(setUsername(null));
                router.push("/");
            });
        }
        effect();
    }, []);
}