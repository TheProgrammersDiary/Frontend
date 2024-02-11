"use client"

import "../../../globals.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from 'next/navigation'
import { postUrl } from "../../../next.config.js";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/store";
import RichTextEditor from "./richTextEditor";
import purify from "dompurify";

export default function Page() {
  const [content, setContent] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const postId = useSearchParams().get('postId');
  const version = useSearchParams().get('version');
  if (postId) {
    useEffect(() => {
      const effect = async () => {
        try {
          const response = await fetch(
            postUrl + "/posts/" + postId + "/" + version,
            { method: "GET", credentials: "omit" }
          );
          if (response.status === 404) {
            const text = await response.text();
            throw new Error(text);
          }
          const responseData = await response.json();
          setValue("title", responseData.title);
          setContent(purify.sanitize(responseData.content));
        } catch (error) {
        }
      };
      effect();
    }, [postId]);
  }
  const jwt = useSelector((state: AppState) => state.jwt);
  if (!jwt) {
    return (<p>You need to login to create a post.</p>);
  }

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
          <p>If you insert an image and want to write below it, click Tab two times instead of clicking with mouse.</p>
        </div>
        {(content || !postId) && <div className="mb-3" style={{ height: "450px" }}>
          <RichTextEditor initialHtml={content} onEditorChange={content => setContent(content)} />
        </div>}
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
    if (!postId) {
      const body = { "title": data.title, "content": content };
      await fetch(
        postUrl + "/posts/create",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + jwt },
          credentials: "omit"
        }
      ).then((response) => response.json())
        .then((data) => router.push("/post/" + data.postId));
    } else {
      const body = { "id": postId, "title": data.title, "content": content };
      await fetch(
        postUrl + "/posts/edit",
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + jwt },
          credentials: "omit"
        }
      ).then(_ => router.push("/post/" + postId));
    }
  }
}