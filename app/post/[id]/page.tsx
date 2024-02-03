"use client"

import "../../../globals.css";
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import NewComment from "./newComment";
import Comments from "./comments";
import { postUrl } from "../../../next.config.js";
import Link from "next/link";

export default function Page() {
  const [article, setArticle] = useState(null);
  const [isOwner, setIsOwner] = useState("false");
  const { id } = useParams();
  useEffect(() => {
    const effect = async () => {
      try {
        const response = await fetch(
          postUrl + "/posts/" + id,
          { method: "GET", credentials: "include" }
        );
        if (response.status === 404) {
          const text = await response.text();
          throw new Error(text);
        }
        const responseData = await response.json();
        setArticle(responseData);
        setIsOwner(response.headers.get("IS-OWNER"));
      } catch (error) {
      }
    };
    effect();
  }, [id]);
  if (article) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
        <div className="md:flex">
          <div className="p-8 w-full">
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              {article.title}
            </h1>
            <p className="mt-2 text-gray-500">
              {article.author}
            </p>
            <p className="mt-2 text-gray-600 break-all">
              {article.content}
            </p>
            {isOwner == "true" &&
              <div className="mt-4 w-full">
                <Link href={"/post/create?id=" + id} className="w-full block px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</Link>
              </div>
            }
            <div className="mt-4 w-full">
              <div>
                <h1 className="text-lg leading-tight font-medium text-black">
                  Comments
                </h1>
                <Comments postId={id} />
                <NewComment postId={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}