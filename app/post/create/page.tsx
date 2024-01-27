"use client"

import "../../../globals.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import {postUrl} from "../../../next.config.js";
import { useAppContext } from "../../MemoryStorage";

export default function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const { csrf } = useAppContext();

  return (
    <div className="p-8">
  <div className="text-center">
    <h1 className="p-3 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white inline-block">
      New post
    </h1>
  </div>
  <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <div className="mb-3">
      <label htmlFor="title" className="block text-xl font-medium text-gray-700 dark:text-white mb-3">Post title</label>
      <input
        {...register("title", { required: true })}
        name="title"
        id="title"
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="content" className="block text-xl font-medium text-gray-700 dark:text-white mb-3">Post content</label>
      <textarea 
        {...register("content", { required: true })}
        rows={15}
        name="content"
        id="content"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
    <div className="flex justify-center">
      <button
        id="submit"
        type="submit"
        className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </div>
  </form>
</div>
  );

  async function onSubmit(data, event) {
    event.preventDefault();
    const body = { "author": "reactAuthor", "title": data.title, "content": data.content };
    await fetch(
      postUrl + "/posts/create",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": csrf },
        credentials: "include"
      }
    ).then((response) => response.json())
      .then((data) => router.push("/post/" + data.id));
  }
}