import React from "react";
import { useRouter } from "next/router";
import { useTrendingReviews } from "@/components/statistics/hooks/useTrendingReviews";
import { FindStatisticsTrendingReviewsDto } from "@/wrapper/server";
import period = FindStatisticsTrendingReviewsDto.period;
import { Box, Container, Paper } from "@mantine/core";
import { DetailsBox } from "@/components/general/DetailsBox";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import CenteredLoading from "@/components/general/CenteredLoading";
import GameInfoReviewList from "@/components/game/info/review/GameInfoReviewList";
import UserReviewListView, {
    DEFAULT_USER_REVIEW_LIST_VIEW_DTO,
} from "@/components/review/view/UserReviewListView";

const Index = () => {
    const router = useRouter();
    const { userId } = router.query;

    const profileQuery = useUserProfile(userId as string);
    const username = profileQuery.data?.username;
    if (profileQuery.isLoading) {
        return <CenteredLoading className={"mt-4"} />;
    }
    return (
        <Container
            fluid
            mih={"100%"}
            className={"flex flex-wrap justify-center"}
            p={0}
        >
            <Paper
                w={{
                    base: "100%",
                    lg: "80%",
                }}
            >
                <DetailsBox title={`${username}'s Reviews`}>
                    <UserReviewListView userId={userId as string} />
                </DetailsBox>
            </Paper>
        </Container>
    );
};

export default Index;
