import React from "react";
import { Container, Flex, Paper, Stack, Text, Title } from "@mantine/core";

const Privacy = () => {
    return (
        <Container fluid p={0}>
            <Flex justify={"center"}>
                <Paper
                    w={{
                        base: "100%",
                        lg: "80%",
                    }}
                    className={"p-4"}
                >
                    <Stack w={"100%"}>
                        <Title size={"h2"}>Your data stays with us.</Title>
                        <Text>
                            This is the most important aspect of how we handle
                            data at GameNode. We take extra care to make sure
                            your data never leaves our server.
                        </Text>
                        <Title size={"h4"}>
                            What does this mean in practice?
                        </Title>
                        <Text>
                            Everything you do in GameNode (and any other service
                            for that matter) is stored somewhere. That somewhere
                            is usually a database - a system that stores
                            information effectively - so it can be retrieved
                            later. This data may include anything from a user's
                            shopping tendencies, to what they've left in the
                            cart in the last visit, to (in our case) games you
                            have in a collection.
                        </Text>
                        <Text>
                            In the age of information, such information equals
                            money. And advertisement companies are willing to
                            spent thousands upon thousands of dollars to obtain
                            it and improve their marketing campaigns.
                        </Text>
                        <Title size={"h3"}>How do we handle analytics?</Title>
                        <Text>
                            If you are not aware, analytics is a term used to
                            describe services or methods for identifying user
                            behaviour, popular parts of a website/app, or track
                            any kind of marketing goal.
                        </Text>
                        <Text>
                            To keep this data locally, we choose a open-sourced,
                            privacy-first analytics solution called{" "}
                            <a href={"https://matomo.org"}>Matomo</a>.
                        </Text>
                        <Text>
                            Matomo helps us keep a good record of the pages our
                            visitors and users are most frequently using, while
                            also keep data as anonymized as possible. Since
                            Matomo doesn't make use of any cross-site tracking
                            method (usually referred to as third-party cookies)
                            you can be assured that neither we or Matomo will
                            ever know what you were doing before visiting our
                            website, or what you would be doing after.
                        </Text>
                        <Text>
                            All other, non-analytics data (for example, the
                            games a user have in their collections) is stored in
                            our database and only used our systems require such
                            information. For example, we retrieve the games a
                            user may have when a visitor visits their library.
                        </Text>
                        <Text>
                            This data is not used for any other purpose.
                        </Text>
                    </Stack>
                </Paper>
            </Flex>
        </Container>
    );
};

export default Privacy;
