import React from "react";
import { IconBan, IconDots, IconEdit, IconTrashOff } from "@tabler/icons-react";
import { ActionIcon, Menu } from "@mantine/core";
import { Review } from "@/wrapper/server";
import { useDisclosure } from "@mantine/hooks";
import ReviewListItemRemoveModal from "@/components/review/view/ReviewListItemRemoveModal";

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
    const [reviewRemoveModalOpened, reviewRemoveModalUtils] =
        useDisclosure(false);
    return (
        <Menu shadow={"md"} width={200} position={"left"}>
            <ReviewListItemRemoveModal
                reviewId={review.id}
                onClose={reviewRemoveModalUtils.close}
                opened={reviewRemoveModalOpened}
            />
            <Menu.Target>
                <ActionIcon variant={"subtle"} c={"white"}>
                    <IconDots />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                {isOwnReview && (
                    <>
                        <Menu.Item
                            onClick={onEditStart}
                            leftSection={<IconEdit size={"1rem"} />}
                            disabled={!isOwnReview}
                        >
                            Edit
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => reviewRemoveModalUtils.open()}
                            leftSection={<IconTrashOff size={"1rem"} />}
                            disabled={!isOwnReview}
                        >
                            Remove
                        </Menu.Item>
                    </>
                )}
                <Menu.Item leftSection={<IconBan size={"1rem"} />}>
                    Report
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default ReviewListItemDropdown;
