import React, { useMemo } from "react";
import {
    ActionIcon,
    Box,
    Container,
    Divider,
    Group,
    Stack,
    Title,
} from "@mantine/core";
import { useCollectionEntriesForCollectionId } from "@/components/collection/collection-entry/hooks/useCollectionEntriesForCollectionId";
import { Collection, GetCollectionEntriesDto } from "@/wrapper";
import { useCollection } from "@/components/collection/hooks/useCollection";
import { IconDots } from "@tabler/icons-react";
import CollectionEntriesView from "@/components/collection/collection-entry/view/CollectionEntriesView";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ICollectionViewProps {
    collectionId: string;
}

const CollectionViewFormSchema = z.object({
    search: z.string().optional(),
    page: z.number().optional().default(1),
});

type CollectionViewFormValues = z.infer<typeof CollectionViewFormSchema>;

const CollectionView = ({ collectionId }: ICollectionViewProps) => {
    const DEFAULT_REQUEST_PARAMS: GetCollectionEntriesDto = {
        limit: 20,
        offset: 0,
        search: undefined,
        relations: {
            game: {
                cover: true,
            },
            collection: true,
            ownedPlatforms: true,
        },
    };

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
    }, [DEFAULT_REQUEST_PARAMS, formValues]);

    const collectionQuery = useCollection(collectionId);
    const collection = collectionQuery.data;
    const collectionEntriesQuery = useCollectionEntriesForCollectionId(
        collectionId,
        requestParams,
    );
    return (
        <Container fluid p={0} h={"100%"}>
            <Stack w={"100%"} h={"100%"} gap={0} align={"center"}>
                <Group className="w-[calc(100%-2rem)] mt-4 flex-nowrap justify-between">
                    <Title size={"h4"}>{collection?.name}</Title>
                    <ActionIcon>
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
