import {
    ActionIcon,
    Box,
    Button,
    Container,
    Flex,
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
import Link from "next/link";

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
                <Stack gap={0} className="mt-32 lg:mt-40 w-full">
                    <Title className="">Play. Review. Share.</Title>
                </Stack>

                <Link href={"/search"}>
                    <Button>Join in</Button>
                </Link>
                <Stack>
                    <Text c={"dimmed"} fz={"1rem"}>
                        Games metadata are a courtesy of{" "}
                        <a
                            className={"text-blue-800"}
                            href={"https://igdb.com"}
                        >
                            IGDB
                        </a>
                        .
                    </Text>
                    <Text c={"dimmed"} fz={"0.9rem"}></Text>
                </Stack>
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
