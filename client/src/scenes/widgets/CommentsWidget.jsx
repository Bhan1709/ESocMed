import { useSelector } from "react-redux";
import { useEffect } from "react";
import CommentWidget from "./CommentWidget";

const CommentsWidget = ({ postId, postUserId, comments, setComments }) => {
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
            userId,
            comment,
            likes
        }) => (
            <CommentWidget
                key={_id}
                commentId={_id}
                commentUserId={userId}
                postUserId={postUserId}
                comment={comment}
                likes={likes}
                comments={comments}
                setComments={setComments}
            />
        ))}
    </>
}

export default CommentsWidget;
