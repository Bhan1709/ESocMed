import {
    FavoriteBorderOutlined,
    FavoriteOutlined
} from "@mui/icons-material";
import { useTheme, Box, Typography, Divider, IconButton } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import { useState } from "react";

const CommentWidget = ({
    commentId,
    commentUserId,
    postUserId,
    comment,
    likes,
    comments,
    setComments
}) => {
    const token = useSelector(state => state.token);
    const loggedInUserId = useSelector(state => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const [isCommentHover, setIsCommentHover] = useState(false);

    const { palette } = useTheme();

    const patchCommentLike = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/comments/${commentId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        const updatedComment = await response.json();
        const updatedComments = comments.map(comment => {
            if (comment._id === updatedComment._id) return updatedComment;
            return comment;
        });
        setComments(updatedComments);
    }

    const deleteComment = async () => {

    }

    return (
        <Box>
            <FlexBetween
                onMouseOver={() => setIsCommentHover(true)}
                onMouseOut={() => setIsCommentHover(false)}
            >
                <Typography sx={{ color: palette.neutral.main, margin: "0.5rem 0", paddingLeft: "1rem" }}>
                    {comment}
                </Typography>
                {isCommentHover && (<FlexBetween>
                    <IconButton onClick={patchCommentLike}>
                        {isLiked ? <FavoriteOutlined sx={{ color: palette.primary.main, fontSize: "1rem" }} />
                            : <FavoriteBorderOutlined sx={{ fontSize: "1rem" }} />}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </FlexBetween>)}
            </FlexBetween>
            <Divider />
        </Box>
    );
}

export default CommentWidget;