import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, Button, Group } from "@mantine/core";
import {
    FloatingLabelInput,
    IFloatingLabelInputProps,
} from "@/components/general/input/FloatingLabelInput";
import { IconSearch } from "@tabler/icons-react";

interface SearchBarProps extends IFloatingLabelInputProps {
    withButton?: boolean;
}

const SearchBar = ({ withButton, ...props }: SearchBarProps) => {
    return (
        <Group noWrap className="w-full" spacing={0}>
            <FloatingLabelInput
                {...props}
                classNames={{
                    input: withButton
                        ? "!rounded-tr-none !rounded-br-none"
                        : undefined,
                }}
            />
            {withButton && (
                <Button
                    type="submit"
                    className="!rounded-tl-none !rounded-bl-none"
                >
                    Search
                </Button>
            )}
        </Group>
    );
};

export default SearchBar;
