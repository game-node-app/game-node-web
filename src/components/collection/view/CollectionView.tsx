import React, { useMemo } from "react";
import {
    ActionIcon,
    Box,
    Container,
    Divider,
    Group,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { useCollectionEntriesForCollectionId } from "@/components/collection/collection-entry/hooks/useCollectionEntriesForCollectionId";
import { Collection, GetCollectionEntriesDto } from "@/wrapper/server";
import { useCollection } from "@/components/collection/hooks/useCollection";
import { IconDots } from "@tabler/icons-react";
import CollectionEntriesView from "@/components/collection/collection-entry/view/CollectionEntriesView";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CollectionCreateOrUpdateModal from "@/components/collection/form/modal/CollectionCreateOrUpdateModal";
import { useDisclosure } from "@mantine/hooks";

interface ICollectionViewProps {
    collectionId: string;
}

const CollectionViewFormSchema = z.object({
    search: z.string().optional(),
    page: z.number().optional().default(1),
});

type CollectionViewFormValues = z.infer<typeof CollectionViewFormSchema>;

const DEFAULT_REQUEST_PARAMS: GetCollectionEntriesDto = {
    limit: 20,
    offset: 0,
    search: undefined,
    relations: {
        game: {
            cover: true,
            genres: true,
            platforms: true,
        },
        ownedPlatforms: true,
    },
};

const CollectionView = ({ collectionId }: ICollectionViewProps) => {
    const [modalOpened, modalUtils] = useDisclosure();

    const { register, watch, setValue } = useForm<CollectionViewFormValues>({
        mode: "onSubmit",
        resolver: zodResolver(CollectionViewFormSchema),
    });

    const formValues = watch();

    const requestParams: GetCollectionEntriesDto = useMemo(() => {
        const page = formValues.page || 1;
        const offset = (page - 1) * DEFAULT_REQUEST_PARAMS.limit!;
        return {
            ...DEFAULT_REQUEST_PARAMS,
            ...formValues,
            offset,
        };
    }, [formValues]);

    const collectionQuery = useCollection(collectionId);
    const collection = collectionQuery.data;
    const collectionEntriesQuery = useCollectionEntriesForCollectionId(
        collectionId,
        requestParams,
    );
    return (
        <Container fluid p={0} h={"100%"}>
            <Stack w={"100%"} h={"100%"} gap={0} align={"center"}>
                <Group className="w-[calc(100%-2rem)] mt-8 flex-nowrap justify-between">
                    <CollectionCreateOrUpdateModal
                        opened={modalOpened}
                        onClose={() => modalUtils.close()}
                        existingCollectionId={collectionId}
                    />
                    <Stack w={{ base: "70%", lg: "30%" }}>
                        <Title
                            size={"h3"}
                            className={
                                "w-fit underline decoration-dotted decoration-2 decoration-stone-700"
                            }
                        >
                            {collection?.name}
                        </Title>
                        <Text c={"dimmed"}>
                            {collectionQuery.data?.description}
                        </Text>
                    </Stack>
                    <ActionIcon onClick={() => modalUtils.open()}>
                        <IconDots size={"1.2rem"} />
                    </ActionIcon>
                </Group>
                <Divider
                    className={"w-[calc(100%-2rem)]"}
                    my={"sm"}
                    variant={"dashed"}
                />
                <CollectionEntriesView
                    isLoading={collectionEntriesQuery.isLoading}
                    isError={collectionEntriesQuery.isError}
                    isFetching={collectionEntriesQuery.isFetching}
                    entries={collectionEntriesQuery.data?.data}
                    paginationInfo={collectionEntriesQuery.data?.pagination}
                    onPaginationChange={(page) => {
                        setValue("page", page);
                    }}
                />
            </Stack>
        </Container>
    );
};

export default CollectionView;
