import React from "react";
import { Box, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

export type PreferencesActiveItem = "profile" | "connections" | "privacy";

interface PreferencesCategory {
    name: string;
    activeItemName: PreferencesActiveItem;
}

interface Props {
    activeItem: PreferencesActiveItem;
    onChange: (activeItem: PreferencesActiveItem) => void;
}

export const preferencesCategories: PreferencesCategory[] = [
    {
        name: "Profile",
        activeItemName: "profile",
    },
    {
        name: "Connections",
        activeItemName: "connections",
    },
    {
        name: "Privacy",
        activeItemName: "privacy",
    },
];

const PreferencesScreenSideBar = ({ activeItem, onChange }: Props) => {
    const itemsElements = preferencesCategories.map((item) => {
        const isActiveItem = item.activeItemName === activeItem;
        return (
            <Link
                key={item.activeItemName}
                href={``}
                onClick={(evt) => {
                    evt.preventDefault();
                    onChange(item.activeItemName);
                }}
            >
                <Box
                    className={`w-full flex justify-center items-center h-12 ${isActiveItem ? "bg-brand-5" : undefined}`}
                >
                    <Text fz={"1.3rem"} fw={"bold"}>
                        {item.name}
                    </Text>
                </Box>
            </Link>
        );
    });

    return (
        <Stack gap={0} className={"w-full h-80 justify-between"}>
            <Stack gap={0} className={"w-full"}>
                {itemsElements}
            </Stack>
            <Stack className={"w-full items-center"}>
                <Link href={"/about"}>
                    <Text c={"dimmed"}>Report a bug </Text>
                </Link>
                <Link href={"/auth/logout"}>
                    <Text c={"dimmed"}>Sign out</Text>
                </Link>
            </Stack>
        </Stack>
    );
};

export default PreferencesScreenSideBar;
