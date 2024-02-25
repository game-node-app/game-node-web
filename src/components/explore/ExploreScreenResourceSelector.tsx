import React, { useMemo } from "react";
import {
    ComboboxItem,
    MultiSelect,
    MultiSelectProps,
    SelectProps,
} from "@mantine/core";
import { useGamesResource } from "@/components/game/hooks/useGamesResource";

interface Props extends MultiSelectProps {
    resourceName: string;
}

interface GameResource {
    id: number;
    name: string;
}

const ExploreScreenResourceSelector = ({ resourceName, ...others }: Props) => {
    const resourceQuery = useGamesResource<GameResource>(resourceName);
    const data = useMemo((): ComboboxItem[] | undefined => {
        if (resourceQuery.data == undefined) return undefined;
        return resourceQuery.data.map((resource) => {
            return {
                value: `${resource.id}`,
                label: resource.name,
            };
        });
    }, [resourceQuery.data]);
    return <MultiSelect data={data} {...others} />;
};

export default ExploreScreenResourceSelector;
