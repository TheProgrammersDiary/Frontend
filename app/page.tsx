"use client"

import "../globals.css";
import { Metadata } from "next"
import React, { useEffect, useState } from "react"
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Programmers diary',
}

export default function Page() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const effect = async () => await fetch("http://localhost:8081/posts", { method: "GET", next: { revalidate: 10 } });
    effect()
      .then((response) => response.json())
      .then(
        response => setArticles(
          response.map(
            article =>
              <li key={article.id}>
                <Link href={"/post/" + article.id}>
                  <h2>{article.title}</h2>
                  <p>{article.author}</p>
                </Link>
              </li>
          )
        )
      );
  }, []);
  return (
    <div>
      <div>
        <Link href="/post/create">Create a new post</Link>
      </div>
      <div>
        <h1 className="ring-2 md:ring-4 dark:text-white">Articles</h1>
        <ul>{articles}</ul>
      </div>
    </div>
  );
}