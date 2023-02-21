import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return <WidgetWrapper>
        <FlexBetween>
            <Typography color={dark} variant="h5" fontWeight="500">
                Sponsored
            </Typography>
            <Typography color={medium}>Create Add</Typography>
        </FlexBetween>
        <img
            width="100%"
            height="auto"
            alt="advertisement"
            style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            src="http://localhost:3001/assets/info4.jpeg"
        />
        <FlexBetween>
            <Typography color={main}>MikaCosmetics</Typography>
            <Typography color={medium}>mikacosmetics.com</Typography>
        </FlexBetween>
        <Typography color={medium} margin="0.5rem 0">
            Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating and shining like light.
        </Typography>
    </WidgetWrapper>
}

export default AdvertWidget;