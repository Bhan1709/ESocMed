import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    DeleteOutlined,
} from "@mui/icons-material";
import {
    Box,
    IconButton,
    Typography,
    useTheme,
    Modal
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";
import CommentsWidget from "./CommentsWidget";
import LikesWidget from "./LikesWidget";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    commentIds,
    isProfile
}) => {
    const [isComments, setIsComments] = useState(false);
    const [isLikes, setIsLikes] = useState(false);
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const loggedInUserId = useSelector(state => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const primary = palette.primary.main;
    const main = palette.neutral.main;

    const patchLike = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    }

    const deletePost = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ isProfile: isProfile, userId: loggedInUserId })
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setComments([]);
    }

    return <WidgetWrapper margin="2rem 0">
        <Friend
            friendId={postUserId}
            name={name}
            subtitle={location}
            userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ marginTop: "1rem" }}>
            {description}
        </Typography>
        {picturePath && (
            <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={`${process.env.REACT_APP_SERVER_BASEURL}/assets/${picturePath}`}
            />
        )}
        <FlexBetween marginTop="0.25rem">
            <FlexBetween gap="1rem">

                <FlexBetween gap="0.3rem">
                    <IconButton onClick={patchLike}>
                        {isLiked ? <FavoriteOutlined sx={{ color: primary }} />
                            : <FavoriteBorderOutlined />}
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
                </FlexBetween>

                <FlexBetween gap="0.3rem">
                    <IconButton onClick={() => setIsComments(true)}>
                        <ChatBubbleOutlineOutlined />
                    </IconButton>
                    <Typography
                        onClick={() => setIsComments(true)}
                        sx={{
                            "&:hover": {
                                color: palette.neutral.medium,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {commentIds.length}
                    </Typography>
                </FlexBetween>

            </FlexBetween>
            <Box>
                <IconButton>
                    <ShareOutlined />
                </IconButton>
                {postUserId === loggedInUserId && (
                    <IconButton onClick={deletePost}>
                        <DeleteOutlined />
                    </IconButton>)}
            </Box>
        </FlexBetween>
        <Modal open={isComments} onClose={() => setIsComments(false)}>
            <CommentsWidget
                postId={postId}
                postUserId={postUserId}
                comments={comments}
                setComments={setComments}
                setIsComments={setIsComments}
            />
        </Modal>
        <Modal open={isLikes} onClose={() => setIsLikes(false)}>
            <LikesWidget likes={Object.keys(likes)} setIsLikes={setIsLikes} />
        </Modal>
    </WidgetWrapper>
}

export default PostWidget;