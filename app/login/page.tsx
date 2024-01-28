"use client"

import "../../globals.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { blogUrl } from "../../next.config.js";
import { useAppContext } from "../MemoryStorage";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { setCsrf, setLoginType } = useAppContext();
  const [loginErrorMessage, setLoginErrorMessage] = useState(<p></p>);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Login</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              {...register("username", { required: true })}
              name="username"
              type="input"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              name="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Sign In
            </button>
          </div>
        </form>
        {loginErrorMessage}
        <Link
          href="/request-password-reset"
          className="font-medium text-blue-600 hover:underline"
        >
          Forgot password?
        </Link>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>
        <div className="flex mt-4 gap-x-2">
          <button
            type="button"
            onClick={(e) => router.push(blogUrl + "/oauth2/authorization/google")}
            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?
          <Link
            href="/sign_up"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );

  async function onSubmit(data, event) {
    event.preventDefault();
    const body = { "username": data.username, "password": data.password };
    try {
      const response = await fetch(
        blogUrl + "/users/login",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        }
      );
      if (response.status === 401) {
        const text = await response.text();
        throw new Error(text);
      }
      const json = await response.json();
      setCsrf(json.csrf);
      setLoginType("local");
      signIn('credentials', {
        username: json.username,
        redirect: false
      });
      router.push("/");
    } catch (error) {
      setLoginErrorMessage(<p className="text-red-500">{error.message}</p>);
    }
  }
}