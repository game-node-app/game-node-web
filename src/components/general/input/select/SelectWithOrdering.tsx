import React, { useState } from "react";
import { Group, Select, SelectProps, Text } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";

interface Props extends Omit<SelectProps, "onChange" | "value"> {
    defaultValue: string;
    onChange: (value: string, order: "ASC" | "DESC") => void;
}

/**
 * Custom select component that shows ASC and DESC options for each option.
 * @constructor
 */
const SelectWithOrdering = ({
    data,
    onChange,
    defaultValue,
    ...others
}: Props) => {
    const [internalSelectedItem, setInternalSelectedItem] =
        useState<string>(defaultValue);
    const [internalSelectedOrdering, setInternalSelectedOrdering] = useState<
        "ASC" | "DESC"
    >("DESC");

    return (
        <Select
            {...others}
            defaultValue={defaultValue}
            allowDeselect={false}
            data={data}
            onChange={(v) => {
                if (v) {
                    // Only changes value when selecting another option
                    if (v !== internalSelectedItem) {
                        onChange(v, internalSelectedOrdering);
                        setInternalSelectedItem(v);
                        return;
                    }

                    const updatedOrdering =
                        internalSelectedOrdering === "ASC" ? "DESC" : "ASC";

                    setInternalSelectedOrdering(updatedOrdering);
                    onChange(v, updatedOrdering);
                    return;
                }
            }}
            renderOption={({ option, checked }) => {
                return (
                    <Group className={"w-full flex-nowrap justify-between"}>
                        {option.label}
                        {checked ? (
                            internalSelectedOrdering === "ASC" ? (
                                <IconSortAscending />
                            ) : (
                                <IconSortDescending />
                            )
                        ) : null}
                    </Group>
                );
            }}
        ></Select>
    );
};

export default SelectWithOrdering;
