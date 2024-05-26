import React from "react";
import { IconBan, IconDots, IconEdit, IconTrashOff } from "@tabler/icons-react";
import { ActionIcon, Menu } from "@mantine/core";
import { Review } from "@/wrapper/server";
import { useDisclosure } from "@mantine/hooks";
import ReviewListItemRemoveModal from "@/components/review/view/ReviewListItemRemoveModal";
import useUserId from "@/components/auth/hooks/useUserId";
import ItemDropdown from "@/components/general/input/dropdown/ItemDropdown";

interface IReviewListItemDropdownProps {
    review: Review;
    onEditStart?: () => void;
}

const ReviewListItemDropdownButton = ({
    review,
    onEditStart,
}: IReviewListItemDropdownProps) => {
    const ownUserId = useUserId();
    const isOwnReview =
        ownUserId != undefined && ownUserId === review.profileUserId;

    const [reviewRemoveModalOpened, reviewRemoveModalUtils] =
        useDisclosure(false);

    return (
        <>
            <ReviewListItemRemoveModal
                reviewId={review.id}
                onClose={reviewRemoveModalUtils.close}
                opened={reviewRemoveModalOpened}
            />
            <ItemDropdown>
                {isOwnReview && (
                    <>
                        <ItemDropdown.EditButton
                            onClick={() => {
                                if (onEditStart) {
                                    onEditStart();
                                }
                            }}
                            disabled={!onEditStart}
                        />
                        <ItemDropdown.RemoveButton
                            onClick={() => {
                                reviewRemoveModalUtils.open();
                            }}
                        />
                    </>
                )}
                <ItemDropdown.ReportButton onClick={() => {}} disabled={true} />
            </ItemDropdown>
        </>
    );
};

export default ReviewListItemDropdownButton;
