import { useEffect, useState } from "react";

import {blogUrl} from "../../../next.config.js";
import { useParams } from "next/navigation.js";

export default function Comments() {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);

    const formatDate = (postedDate) => {
        const date = new Date(postedDate);
        const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
        return formattedDate;
      };
    
      const padZero = (value) => (value < 10 ? `0${value}` : value);

    useEffect(() => {
        const effect = async () => {
            await fetch(
                blogUrl + "/comments/list-comments/" + postId,
                { method: "GET", credentials: "omit", }
            ).then(response => response.json())
                .then(response => setComments(
                    response.map(
                        comment =>
                            <li key={comment.id} className="bg-gray-100 p-4 mt-4 rounded-lg break-all">
                                <p className="text-gray-600">{formatDate(comment.dateCreated)}</p>
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