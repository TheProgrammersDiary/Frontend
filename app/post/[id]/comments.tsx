import { useEffect, useState } from "react";

export default function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const effect = async () => {
            await fetch(
                "http://localhost:8080/comments/list-comments/" + postId,
                { method: "GET", credentials: "omit", }
            ).then(response => response.json())
                .then(response => setComments(
                    response.map(
                        comment =>
                            <li key={comment.id} className="bg-gray-100 p-4 mt-4 rounded-lg break-all">
                                <p className="text-gray-700 font-semibold">{comment.author}</p>
                                <p className="text-gray-800">{comment.content}</p>
                            </li>
                    )));
        }
        effect();
    }, [postId]);
    return (
        <ul>{comments.length > 0 ? comments : "No comments"}</ul>
    );
}