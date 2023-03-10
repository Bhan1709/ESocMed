import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined
} from "@mui/icons-material";
import {
    Box,
    Typography,
    Divider,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import useOnClickOutside from "utils/useOnClickOutside";

const MyPostWidget = ({ picturePath, isProfile = false }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const addPostRef = useRef();
    useOnClickOutside(addPostRef, () => {
        if (!image) setIsImage(false)
    });

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        formData.append("isProfile", isProfile);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    }

    return <WidgetWrapper ref={addPostRef}>
        <FlexBetween gap="1.5rem">
            <UserImage image={picturePath} />
            <InputBase
                placeholder="What's on your mind..."
                onChange={(e) => setPost(e.target.value)}
                value={post}
                sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: "1rem 2rem"
                }}
            />
        </FlexBetween>
        {isImage && (
            <Box
                border={`1px solid ${medium}`}
                borderRadius="5px"
                marginTop="1rem"
                padding="1rem"
            >
                <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={acceptedFiles => setImage(acceptedFiles[0])}
                >
                    {({ getRootProps, getInputProps }) => (
                        <FlexBetween>
                            <Box
                                {...getRootProps()}
                                border={`2px dashed ${palette.primary.main}`}
                                padding="1rem"
                                width="100%"
                                sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                                <input {...getInputProps()} />
                                {!image ? (
                                    <p>Add Image Here</p>
                                ) : (
                                    <FlexBetween>
                                        <Typography>{image.name}</Typography>
                                        <EditOutlined />
                                    </FlexBetween>
                                )}
                            </Box>
                            {image && (
                                <IconButton
                                    onClick={() => setImage(null)}
                                    sx={{ marginLeft: "1rem" }}
                                >
                                    <DeleteOutlined sx={{ fontSize: "1.5rem" }} />
                                </IconButton>
                            )}
                        </FlexBetween>
                    )}
                </Dropzone>
            </Box>
        )}

        <Divider sx={{ margin: "1.25rem 0" }} />

        <FlexBetween>
            <FlexBetween
                gap="0.25rem"
                onClick={() => { if (!image) setIsImage(!isImage) }}
                sx={!image ? { color: mediumMain, "&:hover": { cursor: "pointer", color: medium } } :
                    { color: mediumMain }}
            >
                <ImageOutlined />
                <Typography>
                    Image
                </Typography>
            </FlexBetween>
            {isNonMobileScreens ? (
                <>
                    <FlexBetween gap="0.25rem">
                        <GifBoxOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Clip</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.25rem">
                        <AttachFileOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Attachment</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.25rem">
                        <MicOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Audio</Typography>
                    </FlexBetween>
                </>
            ) : (
                <FlexBetween gap="0.25rem">
                    <MoreHorizOutlined sx={{ color: mediumMain }} />
                </FlexBetween>
            )}

            <Button
                disabled={!post}
                onClick={handlePost}
                sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "3rem"
                }}
            >
                POST
            </Button>
        </FlexBetween>
    </WidgetWrapper>
}

export default MyPostWidget;