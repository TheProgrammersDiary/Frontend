"use client"

import "../../globals.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { blogUrl } from "../../next.config.js";

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Sign up</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              name="email"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nickname" className="block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              name="username"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
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
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account?
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );

  async function onSubmit(data, event) {
    event.preventDefault();
    const body = { "username": data.username, "email": data.email, "password": data.password };
    await fetch(
      blogUrl + "/users/signup",
      { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }
    ).then(_ => { router.push("/login") });
  }
}