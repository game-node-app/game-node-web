import React from "react";
import { IconBan, IconDots, IconEdit } from "@tabler/icons-react";
import { ActionIcon, Menu } from "@mantine/core";
import { Review } from "@/wrapper/server";

interface IReviewListItemDropdownProps {
    review: Review;
    isOwnReview: boolean;
    onEditStart?: () => void;
}

const ReviewListItemDropdown = ({
    isOwnReview,
    review,
    onEditStart,
}: IReviewListItemDropdownProps) => {
    return (
        <Menu shadow={"md"} width={200} position={"left"}>
            <Menu.Target>
                <ActionIcon variant={"subtle"} c={"white"}>
                    <IconDots />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item
                    onClick={onEditStart}
                    leftSection={<IconEdit size={"1rem"} />}
                    disabled={!isOwnReview}
                >
                    Edit
                </Menu.Item>
                <Menu.Item leftSection={<IconBan size={"1rem"} />}>
                    Report
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default ReviewListItemDropdown;
