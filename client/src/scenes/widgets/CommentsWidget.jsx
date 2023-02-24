import { useSelector } from "react-redux";
import { useEffect } from "react";
import CommentWidget from "./CommentWidget";

const CommentsWidget = ({ postId, comments, setComments }) => {
    const token = useSelector(state => state.token);

    const getComments = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/comments/${postId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setComments(data);
    }

    useEffect(() => {
        getComments();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return <>
        {comments.map(({
            _id,
            comment,
            likes
        }) => (
            <CommentWidget
                key={_id}
                comment={comment}
                likes={likes}
            />
        ))}
    </>
}

export default CommentsWidget;
