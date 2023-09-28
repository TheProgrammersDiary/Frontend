"use client"

import "../../../globals.css";
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

export default function Page() {
    const [article, setArticle] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const effect = async () => {
            await fetch(
                "http://localhost:8081/posts/" + id,
                { method: "GET" }
            ).then(response => response.json())
                .then(response => setArticle(response));
        }
        effect();
    });
    if (article) {
        return (
            <div>
                <div>
                    <h1>{article.title}</h1>
                    <p>{article.author}</p>
                </div>
                <span>{article.content}</span>
            </div>
        );
    };
}