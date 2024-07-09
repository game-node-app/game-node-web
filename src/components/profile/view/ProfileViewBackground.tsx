import React from "react";
import { Paper } from "@mantine/core";

interface ProfileViewBackgroundProps {
    userId: string;
}

const ProfileViewBackground = ({ userId }: ProfileViewBackgroundProps) => {
    return (
        <Paper
            style={{
                backgroundColor: "#161616",
            }}
            className={"w-full min-h-48"}
        ></Paper>
    );
};

export default ProfileViewBackground;
