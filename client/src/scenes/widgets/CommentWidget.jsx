import {
    FavoriteBorderOutlined,
    FavoriteOutlined
} from "@mui/icons-material";
import { useTheme, Box, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CommentWidget = ({
    comment,
    likes
}) => {
    const token = useSelector(state => state.token);
    const loggedInUserId = useSelector(state => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();

    return (
        <Box>
            <Typography sx={{ color: palette.neutral.main, margin: "0.5rem 0", paddingLeft: "1rem" }}>
                {comment}
            </Typography>
            <Divider />
        </Box>
    );
}

export default CommentWidget;