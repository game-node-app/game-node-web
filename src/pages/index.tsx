import {
    ActionIcon,
    Box,
    Button,
    Container,
    Grid,
    Group,
    SimpleGrid,
    Space,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import SimpleCard from "@/components/general/card/SimpleCard";
import { IconChevronDown } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useRouter } from "next/router";
import GradientSeparator from "@/components/general/GradientSeparator";

export default function Home() {
    const cardGridRef = useRef<HTMLDivElement>(null);
    const session = useSessionContext();
    const router = useRouter();
    useEffect(() => {
        if (!session.loading && session.doesSessionExist) {
            router.replace("/search");
        }
    }, [session, router]);
    return (
        <Container fluid h={"100%"}>
            <Stack className="h-[80vh] mb-32">
                <Box className="mt-32 lg:mt-40">
                    <Title className="">
                        Catalog all your games in a single place
                    </Title>
                </Box>

                <Group className="justify-start">
                    <Button component={"a"} href={"/search"}>
                        Start searching
                    </Button>
                </Group>
                <Stack
                    gap={0}
                    align="center"
                    justify="flex-start"
                    className="mt-auto mb-xl"
                >
                    <ActionIcon
                        size={"xl"}
                        onClick={() =>
                            cardGridRef.current?.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        <IconChevronDown size="4rem" />
                    </ActionIcon>
                </Stack>
            </Stack>
            <Grid
                px={"lg"}
                ref={cardGridRef}
                className=""
                align="center"
                w={"100%"}
                justify="center"
            >
                <Grid.Col
                    span={{
                        xs: 6,
                        lg: 3,
                    }}
                    className="flex justify-center"
                >
                    <SimpleCard text={"Organize your game library"} />
                </Grid.Col>
                <Grid.Col
                    span={{
                        xs: 6,
                        lg: 3,
                    }}
                    className="flex justify-center"
                >
                    <SimpleCard text={"Connect your platforms"} />
                </Grid.Col>
                <Grid.Col
                    span={{
                        xs: 6,
                        lg: 3,
                    }}
                    className="flex justify-center"
                >
                    <SimpleCard text={"Know where to play each game"} />
                </Grid.Col>
                <Grid.Col
                    span={{
                        xs: 6,
                        lg: 3,
                    }}
                    className="flex justify-center"
                >
                    <SimpleCard text={"Share your reviews"} />
                </Grid.Col>
            </Grid>
            <Space mb={"xl"} />
            <Title ta="center" size="h5">
                GameNode is free (and ad-free!).
            </Title>

            <Space mb={"xl"} />
        </Container>
    );
}
