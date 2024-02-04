"use client"

import "../../../globals.css";
import React, { useState } from "react";
import NewComment from "./newComment";
import Comments from "./comments";
import Post from "./post";

export default function Page() {
  const [isArticleSet, setIsArticleSet] = useState(false);
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
      <div className="md:flex">
        <div className="p-8 w-full">
          <Post onArticleSet={() => setIsArticleSet(true)} />
          {isArticleSet &&
            <div className="mt-4 w-full">
              <div>
                <h1 className="text-lg leading-tight font-medium text-black">
                  Comments
                </h1>
                <Comments />
                <NewComment />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}