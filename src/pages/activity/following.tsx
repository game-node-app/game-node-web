import React from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Container, Text } from "@mantine/core";
import ActivityFeedLayout from "@/components/activity/ActivityFeedLayout";

const Following = () => {
    return (
        <SessionAuth>
            <Container fluid>
                <ActivityFeedLayout currentTab={"following"}>
                    <Text>Teste!</Text>
                </ActivityFeedLayout>
            </Container>
        </SessionAuth>
    );
};

export default Following;
