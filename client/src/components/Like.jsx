import Friend from "./Friend";
import { Box, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Like = ({ userId }) => {
    const [user, setUser] = useState(null);
    const token = useSelector(state => state.token);

    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASEURL}/users/${userId}`,
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

    if (!user) return null;

    return (<>
        <Box display="flex" flexDirection="column" gap="1rem" margin="0.5rem">
            <Friend
                key={`${user.firstName}.${user._id}`}
                friendId={user._id}
                name={`${user.firstName} ${user.lastName}`}
                subtitle={user.occupation}
                userPicturePath={user.picturePath}
            />
        </Box>
        <Divider />
    </>
    );
}

export default Like;