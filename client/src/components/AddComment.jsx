import { SendRounded } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "components/FlexBetween";

const AddComment = ({ postId, setComments }) => {
    const dispatch = useDispatch();
    const loggedInUserId = useSelector(state => state.user._id);
    const token = useSelector(state => state.token);
    const [comment, setComment] = useState("");

    const handleComment = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/comments/${postId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId, comment })
        });
        const { postComments, updatedPost } = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setComments(postComments);
        setComment("");
    }

    return (
        <WidgetWrapper>
            <FlexBetween>
                <InputBase
                    placeholder="Add a Comment..."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    sx={{
                        flex: "1"
                    }}
                />
                <IconButton
                    disabled={!comment}
                    onClick={handleComment}
                >
                    <SendRounded />
                </IconButton>
            </FlexBetween>
        </WidgetWrapper>
    );
}

export default AddComment;