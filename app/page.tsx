"use client"

import "../globals.css";
import React, { useEffect, useState } from "react"
import Link from 'next/link';
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const effect = async () => await fetch("http://localhost:8081/posts", { method: "GET", next: { revalidate: 10 } });
    effect()
      .then((response) => response.json())
      .then(
        response => setArticles(
          response.map(
            article =>
            <Link key={article.id} href={"/post/" + article.id} className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{article.author}</p>
            </Link>
          )
        )
      );
  }, []);
  return (
    <div>
      <div>{session ? (<p>Logged in as {session?.user.name}</p>) : (<p>Logged out</p>)}</div>
      <Link href="/post/create" className="flex items-center justify-center text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Create a new post
      </Link>
      <div>
        <div className="flex items-center justify-center">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Articles</span>
          </h1>
        </div>
        <ul className="list-none">{articles}</ul>
      </div>
    </div>
  );
}