"use client"

import "../../../globals.css";
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import NewComment from "./newComment";
import Comments from "./comments";

export default function Page() {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const effect = async () => {
      await fetch(
        "http://localhost:8081/posts/" + id,
        { method: "GET", credentials: "omit" }
      ).then(response => response.json())
        .then(response => setArticle(response));
    }
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
            <p className="mt-2 text-gray-600">
              {article.content}
            </p>
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