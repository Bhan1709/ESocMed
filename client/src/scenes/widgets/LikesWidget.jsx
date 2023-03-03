import Like from "components/Like";
import WidgetWrapper from "components/WidgetWrapper";
import { useMediaQuery, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";


const LikesWidget = ({ likes, setIsLikes }) => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (<Box>
        <IconButton
            sx={{
                position: "absolute",
                top: "3%",
                right: "3%"
            }}
            onClick={() => setIsLikes(false)}
        >
            <Close />
        </IconButton>
        <WidgetWrapper
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: isNonMobileScreens ? "40%" : "60%"
            }}
        >
            {likes.map(userId => (
                <Like
                    key={userId}
                    userId={userId}
                />
            ))}
        </WidgetWrapper>
    </Box>);
}

export default LikesWidget;