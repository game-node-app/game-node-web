import React, { useMemo } from "react";
import {
    ActionIcon,
    Box,
    Center,
    Container,
    Divider,
    Group,
    SimpleGrid,
    Stack,
    Text,
    Title,
    Tooltip,
} from "@mantine/core";
import { useCollectionEntriesForCollectionId } from "@/components/collection/collection-entry/hooks/useCollectionEntriesForCollectionId";
import { Collection } from "@/wrapper/server";
import { useCollection } from "@/components/collection/hooks/useCollection";
import {
    IconDots,
    IconReplace,
    IconTrash,
    IconTrashOff,
} from "@tabler/icons-react";
import CollectionEntriesView from "@/components/collection/collection-entry/view/CollectionEntriesView";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CollectionCreateOrUpdateModal from "@/components/collection/form/modal/CollectionCreateOrUpdateModal";
import { useDisclosure } from "@mantine/hooks";
import CollectionEntriesMoveModal from "@/components/collection/collection-entry/form/modal/CollectionEntriesMoveModal";
import useUserId from "@/components/auth/hooks/useUserId";
import { useGames } from "@/components/game/hooks/useGames";
import CollectionRemoveModal from "@/components/collection/form/modal/CollectionRemoveModal";
import Head from "next/head";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import CollectionViewActions from "@/components/collection/form/CollectionViewActions";

interface ICollectionViewProps {
    libraryUserId: string;
    collectionId: string;
}

const CollectionViewFormSchema = z.object({
    page: z.number().optional().default(1),
});

type CollectionViewFormValues = z.infer<typeof CollectionViewFormSchema>;

const DEFAULT_LIMIT = 10;

const DEFAULT_REQUEST_PARAMS = {
    limit: DEFAULT_LIMIT,
    offset: 0,
};

const CollectionView = ({
    collectionId,
    libraryUserId,
}: ICollectionViewProps) => {
    const { register, watch, setValue } = useForm<CollectionViewFormValues>({
        mode: "onSubmit",
        resolver: zodResolver(CollectionViewFormSchema),
        defaultValues: {
            page: 1,
        },
    });

    const ownUserId = useUserId();

    const formPage = watch("page");

    const requestParams = useMemo(() => {
        const page = formPage || 1;
        const offset = (page - 1) * DEFAULT_LIMIT;
        return {
            ...DEFAULT_REQUEST_PARAMS,
            offset,
        };
    }, [formPage]);

    const collectionQuery = useCollection(collectionId);
    const collection = collectionQuery.data;
    const isOwnCollection = libraryUserId === ownUserId;
    const collectionEntriesQuery = useCollectionEntriesForCollectionId({
        collectionId,
        offset: requestParams.offset,
        limit: requestParams.limit,
    });
    console.log(collectionEntriesQuery.data);
    const gamesIds = useMemo(() => {
        return collectionEntriesQuery.data?.data.map((entry) => entry.gameId);
    }, [collectionEntriesQuery.data]);
    const gamesQuery = useGames({
        gameIds: gamesIds!,
        relations: {
            cover: true,
        },
    });
    const games = gamesQuery.data;

    const profileQuery = useUserProfile(ownUserId);
    const profile = profileQuery.data;

    const isLoading =
        collectionQuery.isLoading ||
        collectionEntriesQuery.isLoading ||
        gamesQuery.isLoading;
    const isError =
        collectionQuery.isError ||
        collectionEntriesQuery.isError ||
        gamesQuery.isError;

    return (
        <Container fluid p={0} h={"100%"}>
            {collection && profile && (
                <Head>
                    <title>
                        {`${profile.username} - ${collection.name} - GameNode`}
                    </title>
                </Head>
            )}
            <Stack w={"100%"} h={"100%"} gap={0} align={"center"}>
                <Group className="w-[calc(100%-2rem)] mt-8 flex-nowrap justify-between">
                    <Stack w={{ base: "70%", lg: "30%" }}>
                        <Title
                            size={"h3"}
                            className={
                                "w-full break-words underline decoration-dotted decoration-2 decoration-stone-700"
                            }
                        >
                            {collection?.name}
                        </Title>
                        <Text c={"dimmed"} w={"100%"} className={"break-words"}>
                            {collectionQuery.data?.description}
                        </Text>
                    </Stack>
                    {isOwnCollection && (
                        <CollectionViewActions collectionId={collectionId} />
                    )}
                </Group>
                <Divider
                    className={"w-[calc(100%-2rem)]"}
                    my={"sm"}
                    variant={"dashed"}
                />
                <CollectionEntriesView
                    isLoading={isLoading}
                    isError={isError}
                    games={games}
                    paginationInfo={collectionEntriesQuery.data?.pagination}
                    page={formPage}
                    onPaginationChange={(page) => {
                        setValue("page", page);
                    }}
                />
            </Stack>
        </Container>
    );
};

export default CollectionView;
