"use client"

import "../../../globals.css";
import React from "react";
import { useParams } from 'next/navigation';

export default async function Page() {
    const { id } = useParams();
    const article = await fetch(
        "http://localhost:8081/posts/" + id,
        { method: "GET" }
    ).then(response => response.json());
    return (
        <div>
            <div>
                <h1>{article.title}</h1>
                <p>{article.author}</p>
            </div>
            <span>{article.content}</span>
        </div>
    );
}