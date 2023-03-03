import { useSelector } from "react-redux";
import { useEffect } from "react";
import Comment from "../../components/Comment";
import WidgetWrapper from "components/WidgetWrapper";
import AddComment from "components/AddComment";
import { useMediaQuery, Divider, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const CommentsWidget = ({ postId, postUserId, comments, setComments, setIsComments }) => {
    const token = useSelector(state => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

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

    return (<Box>
        <IconButton
            sx={{
                position: "absolute",
                top: "3%",
                right: "3%"
            }}
            onClick={() => setIsComments(false)}
        >
            <Close />
        </IconButton>
        <WidgetWrapper
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: isNonMobileScreens ? "50%" : "70%",
            }}
        >
            <AddComment
                postId={postId}
                setComments={setComments}
            />
            <Divider />
            {comments.map(({
                _id,
                userId,
                comment,
                likes,
                createdAt
            }) => (
                <Comment
                    key={_id}
                    commentId={_id}
                    commentUserId={userId}
                    postId={postId}
                    postUserId={postUserId}
                    comment={comment}
                    likes={likes}
                    comments={comments}
                    setComments={setComments}
                    createdAt={createdAt}
                />
            ))}
        </WidgetWrapper>
    </Box>
    );
}

export default CommentsWidget;
