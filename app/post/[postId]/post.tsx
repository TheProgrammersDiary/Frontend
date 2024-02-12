"use client"

import Link from "next/link";
import "../../../globals.css";
import { useEffect, useState } from "react";
import { postUrl } from "../../../next.config.js";
import { useParams } from "next/navigation";
import Dropdown from "./dropdown";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/store";
import purify from "dompurify";

export default function Post({ onArticleSet }) {
  const jwt = useSelector((state: AppState) => state.jwt);
  const [article, setArticle] = useState(null);
  const [version, setVersion] = useState(null);
  const [isOwner, setIsOwner] = useState("false");
  const { postId } = useParams();
  useEffect(() => {
    if (!version) {
      return;
    }
    const effect = async () => {
      try {
        const response = await fetch(
          postUrl + "/posts/" + postId + "/" + version,
          {
            method: "GET",
            credentials: "omit",
            headers: { "Authorization": "Bearer " + jwt }
          }
        );
        if (response.status === 404) {
          const text = await response.text();
          throw new Error(text);
        }
        const responseData = await response.json();
        setArticle(responseData);
        onArticleSet();
        setIsOwner(response.headers.get("IS-OWNER"));
      } catch (error) {
      }
    };
    effect();
  }, [postId, version, jwt]);
  return (
    <>
      <div className="flex justify-end mb-4">
        <div className="w-full">
          <Dropdown postId={postId} onValueChanged={(version) => setVersion(version)} />
        </div>
      </div>
      {article && isOwner == "true" && (
        <div className="mt-4 w-full">
          <Link
            href={"/post/create?postId=" + postId + "&version=" + version}
            className="w-full block px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit
          </Link>
        </div>
      )}
      {article && (
        <>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
            {article.title}
          </h1>
          <p className="mt-2 text-gray-500">
            {article.author}
          </p>
          <div id="post-content" className="mt-2 text-gray-600 break-all" dangerouslySetInnerHTML={{ __html: purify.sanitize(article.content) }}></div>
        </>
      )}
    </>
  );
}