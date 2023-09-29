import { useEffect, useState } from "react";

export default function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const effect = async () => {
            await fetch(
                "http://localhost:8080/comments/list-comments/" + postId,
                { method: "GET" }
            ).then(response => response.json())
                .then(response => setComments(
                    response.map(
                        comment =>
                            <li key={comment.id}>
                                <p>{comment.author}</p>
                                <p>{comment.content}</p>
                            </li>
                    )));
        }
        effect();
    });
    return (
        <ul>{comments}</ul>
    );
}