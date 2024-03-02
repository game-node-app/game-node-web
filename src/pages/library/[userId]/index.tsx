import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Container, Stack, Title } from "@mantine/core";
import LibraryView from "@/components/library/view/LibraryView";
import ProfileFavoriteGames from "@/components/profile/view/ProfileFavoriteGames";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { DetailsBox } from "@/components/general/DetailsBox";

const Index = () => {
    const router = useRouter();
    const { userId } = router.query;
    const userProfileQuery = useUserProfile(userId as string);

    return (
        <LibraryView
            userId={userId as string | undefined}
            collectionId={undefined}
        >
            <Container fluid p={0}>
                <Stack
                    w={"100%"}
                    h={"100%"}
                    justify={"center"}
                    align={"center"}
                    mt={"xl"}
                >
                    <DetailsBox
                        title={`${userProfileQuery.data?.username}'s Favorite Games`}
                        stackProps={{ className: "w-full" }}
                    >
                        <ProfileFavoriteGames userId={userId as string} />
                    </DetailsBox>
                </Stack>
            </Container>
        </LibraryView>
    );
};

export default Index;
