import React, { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { GameRepositoryFilterDto } from "@/wrapper/server";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Center,
    ComboboxItem,
    Drawer,
    SimpleGrid,
    Stack,
} from "@mantine/core";
import {
    BaseModalChildrenProps,
    BaseModalProps,
} from "@/util/types/modal-props";
import ExploreScreenResourceSelector from "@/components/explore/ExploreScreenResourceSelector";

// @ts-ignore
const FilterFormSchema = z.object({
    themes: z.array(z.string()).optional(),
    genres: z.array(z.string()).optional(),
    platforms: z.array(z.string()).optional(),
    category: z.string().optional(),
    gameModes: z.array(z.string()).optional(),
    status: z.string().optional(),
});

type FilterFormValues = z.infer<typeof FilterFormSchema>;

interface Props extends BaseModalProps {
    setFilter: (value: GameRepositoryFilterDto) => void;
}

/**
 * PS: DO NOT use this as 'data' for the MultiSelect component. This is only for reference when building the JSX below.
 */
const resources: ComboboxItem[] = [
    {
        label: "Themes",
        value: "themes",
    },
    {
        label: "Genres",
        value: "genres",
    },
    {
        label: "Platforms",
        value: "platforms",
    },
    {
        label: "Modes",
        value: "gameModes",
    },
];

const ExploreScreenDrawer = ({ onClose, opened, setFilter }: Props) => {
    const { handleSubmit, register, setValue, watch } =
        useForm<FilterFormValues>({
            resolver: zodResolver(FilterFormSchema),
            mode: "onBlur",
        });

    const onSubmit = (data: FilterFormValues) => {
        const convertedData: any = {};
        for (const [k, v] of Object.entries(data)) {
            if (v != undefined && Array.isArray(v)) {
                convertedData[k] = v.map((text) => parseInt(text), 10);
            }
        }
        console.log("Converted data: ", convertedData);
        setFilter(convertedData);
    };

    return (
        <Drawer onClose={onClose} opened={opened} title={"Filters"}>
            <form className={"w-full h-full"} onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid cols={2}>
                    {resources.map((resourceReference) => {
                        const valueName = resourceReference.value as any;
                        return (
                            <ExploreScreenResourceSelector
                                label={resourceReference.label}
                                key={valueName}
                                resourceName={valueName}
                                {...register(valueName)}
                                value={watch(valueName)}
                                onChange={(value) => {
                                    setValue(valueName, value);
                                }}
                            />
                        );
                    })}
                </SimpleGrid>
                <Center className={"mt-8"}>
                    <Button type="submit">Filter</Button>
                </Center>
            </form>
        </Drawer>
    );
};

export default ExploreScreenDrawer;
