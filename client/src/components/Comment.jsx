import {
    FavoriteBorderOutlined,
    FavoriteOutlined,
    DeleteOutlineOutlined
} from "@mui/icons-material";
import { useTheme, Box, Typography, Divider, IconButton, Modal, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setPost } from "state";
import UserImage from "./UserImage";
import LikesWidget from "scenes/widgets/LikesWidget";
import ReactTimeAgo from "react-time-ago";

const Comment = ({
    commentId,
    commentUserId,
    postId,
    postUserId,
    comment,
    likes,
    comments,
    setComments,
    createdAt
}) => {
    const [user, setUser] = useState(null);
    const [isLikes, setIsLikes] = useState(false);
    const token = useSelector(state => state.token);
    const loggedInUserId = useSelector(state => state.user._id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const [isCommentHover, setIsCommentHover] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const { palette } = useTheme();

    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/users/${commentUserId}`,
            {
                mathod: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

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
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/comments/${postId}/${commentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const { postComments, updatedPost } = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setComments(postComments);
    }

    if (!user) return null;

    return (
        <Box
            onMouseOver={() => setIsCommentHover(true)}
            onMouseOut={() => setIsCommentHover(false)}
        >
            <FlexBetween gap="1rem" sx={{ margin: "0.5rem" }}>
                <FlexBetween gap="1rem">
                    {<UserImage image={user.picturePath} size="45px" />}
                    <Box
                        onClick={() => {
                            navigate(`/profile/${commentUserId}`);
                            navigate(0);
                        }}
                    >
                        <Typography
                            color={palette.neutral.main}
                            variant="h5"
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>
                        <Typography color={palette.neutral.medium} fontSize="0.75rem">
                            <ReactTimeAgo date={createdAt} locale="en-US" />
                        </Typography>
                    </Box>
                </FlexBetween>
                {(isCommentHover || !isNonMobileScreens) && (<FlexBetween>
                    <IconButton onClick={patchCommentLike}>
                        {isLiked ? <FavoriteOutlined sx={{ color: palette.primary.main, fontSize: "1rem" }} />
                            : <FavoriteBorderOutlined sx={{ fontSize: "1rem" }} />}
                    </IconButton>
                    {likeCount > 0 ? <Typography
                        onClick={() => setIsLikes(true)}
                        sx={{
                            "&:hover": {
                                color: palette.neutral.medium,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {likeCount}
                    </Typography> :
                        <Typography>{likeCount}</Typography>}
                    {(commentUserId === loggedInUserId || postUserId === loggedInUserId) && (
                        <IconButton onClick={deleteComment} sx={{ marginLeft: "1rem" }}>
                            <DeleteOutlineOutlined />
                        </IconButton>
                    )}
                </FlexBetween>)}
            </FlexBetween>
            <Typography color={palette.neutral.main} sx={{ margin: "0.5rem" }}>
                {comment}
            </Typography>
            <Divider />
            <Modal open={isLikes} onClose={() => setIsLikes(false)}>
                <LikesWidget likes={Object.keys(likes)} setIsLikes={setIsLikes} />
            </Modal>
        </Box>
    );
}

export default Comment;