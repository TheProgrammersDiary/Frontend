"use client"

import "../../globals.css";
import { blogUrl } from "../../next.config.js";
import { useRouter } from 'next/navigation.js';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { setJwt, setLoginType, setUsername } from "../../redux/actions";

export default function Logout() {
    const dispatch = useDispatch();
    const jwt = useSelector((state: AppState) => state.jwt);
    const router = useRouter();
    return (<button type="button" onClick={logout} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
        Logout
    </button>
    );

    async function logout() {
        await fetch(
            blogUrl + "/users/logout",
            {
                method: "POST",
                credentials: "include",
                headers: { "Authorization": "Bearer " + jwt }
            }
        ).then(_ => {
            dispatch(setJwt(null));
            dispatch(setLoginType(null));
            dispatch(setUsername(null));
            router.push("/");
        });
    }
}