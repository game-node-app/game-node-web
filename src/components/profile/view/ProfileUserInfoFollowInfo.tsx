import React from "react";
import { FollowInfoRequestDto } from "@/wrapper/server";
import { useDisclosure } from "@mantine/hooks";
import { Group, Text, Title } from "@mantine/core";
import { useInfiniteFollowInfo } from "@/components/follow/hooks/useInfiniteFollowInfo";
import FollowInfoListModal from "@/components/follow/modal/FollowInfoListModal";
import TitleLink from "@/components/general/TitleLink";

interface Props {
    targetUserId: string;
    criteria: FollowInfoRequestDto.criteria;
}

const ProfileUserInfoFollowInfo = ({ targetUserId, criteria }: Props) => {
    const [modalOpened, modalUtils] = useDisclosure();
    const followInfoQuery = useInfiniteFollowInfo({
        limit: 1,
        criteria,
        targetUserId,
    });
    const totalItems =
        followInfoQuery.data?.pages[0]?.pagination.totalItems || 0;
    return (
        <Group className={"w-full justify-between px-4"}>
            <FollowInfoListModal
                targetUserId={targetUserId}
                criteria={criteria}
                opened={modalOpened}
                onClose={modalUtils.close}
            />
            <TitleLink
                href={"#"}
                onClick={(evt) => {
                    evt.preventDefault();
                    modalUtils.open();
                }}
                size={"h5"}
            >
                {criteria === "followers" ? "Followers" : "Following"}
            </TitleLink>
            <Text>{totalItems}</Text>
        </Group>
    );
};

export default ProfileUserInfoFollowInfo;
