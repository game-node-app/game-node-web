import React, { ComponentProps, useMemo, useState } from "react";

import { SearchBarProps } from "@/components/general/input/SearchBar/SearchBar";
import { FloatingLabelInput } from "@/components/general/input/FloatingLabelInput/FloatingLabelInput";
import {
    ActionIcon,
    Box,
    Button,
    Combobox,
    ComboboxOptionProps,
    ComboboxStore,
    Group,
    ScrollArea,
    TextInput,
    TextInputProps,
    useCombobox,
} from "@mantine/core";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import useSearchGames from "@/components/game/hooks/useSearchGames";
import {
    IconClearAll,
    IconLoader,
    IconSearch,
    IconX,
} from "@tabler/icons-react";
import SearchBarSelectOption from "@/components/general/input/SearchBar/SearchBarSelectOption";
import { Game } from "@/wrapper/server";
import { SearchGame } from "@/components/game/search/utils/types";
import { useRouter } from "next/router";

interface ISearchBarWithSelectProps extends TextInputProps {
    withButton: boolean;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onOptionSubmit: (
        value: string,
        options: ComboboxOptionProps,
        combobox: ComboboxStore,
    ) => void;
    onClear: () => void;
}

const SearchBarWithSelect = ({
    withButton,
    value,
    onOptionSubmit,
    onClear,
    ...others
}: ISearchBarWithSelectProps) => {
    const router = useRouter();
    const combobox = useCombobox();
    const [debouncedQuery] = useDebouncedValue(value, 300);
    const isQueryEnabled =
        debouncedQuery != undefined && debouncedQuery.length > 2;
    const searchGamesQuery = useSearchGames(
        {
            query: debouncedQuery,
            limit: 5,
        },
        isQueryEnabled,
    );

    // Who thought this was a good idea?
    // Oh, it was me...
    const isResultEmpty =
        searchGamesQuery.data == undefined ||
        searchGamesQuery.data.data == undefined ||
        searchGamesQuery.data.data.items == undefined;

    const options = useMemo(() => {
        if (isResultEmpty) return undefined;
        return searchGamesQuery.data!.data!.items!.map((value) => {
            return <SearchBarSelectOption key={value.id} game={value} />;
        });
    }, [isResultEmpty, searchGamesQuery.data]);

    return (
        <Group
            wrap={"nowrap"}
            className="w-full"
            justify="center"
            align="start"
            gap={0}
        >
            <Combobox
                store={combobox}
                withinPortal={false}
                onOptionSubmit={(value, options) =>
                    onOptionSubmit(value, options, combobox)
                }
            >
                <Combobox.Target>
                    <TextInput
                        {...others}
                        placeholder={"Search for games"}
                        value={value ?? ""}
                        onClick={() => {
                            combobox.openDropdown();
                        }}
                        onFocus={() => {
                            combobox.openDropdown();
                        }}
                        onBlur={() => {
                            combobox.closeDropdown();
                        }}
                        classNames={{
                            root: "!grow",
                            input: withButton
                                ? "!rounded-tr-none !rounded-br-none"
                                : undefined,
                        }}
                        rightSection={
                            <Group wrap={"nowrap"}>
                                <Box w={"0.8rem"}>
                                    {searchGamesQuery.isFetching && (
                                        <IconLoader size={"0.8rem"} />
                                    )}
                                </Box>
                                <Box w={"1rem"} mr={25}>
                                    {value != undefined && value.length > 0 && (
                                        <IconX
                                            size={"1rem"}
                                            onClick={onClear}
                                        />
                                    )}
                                </Box>

                                {withButton && (
                                    <Button
                                        type="submit"
                                        className="!rounded-tl-none !rounded-bl-none"
                                    >
                                        <IconSearch />
                                    </Button>
                                )}
                            </Group>
                        }
                        mr={"0.5rem"}
                    />
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>
                        <ScrollArea h={isResultEmpty ? 30 : 400}>
                            {options}
                            {searchGamesQuery.isError && (
                                <Combobox.Empty>
                                    Failed to fetch results.
                                </Combobox.Empty>
                            )}
                            {isResultEmpty && (
                                <Combobox.Empty>No results.</Combobox.Empty>
                            )}
                        </ScrollArea>
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </Group>
    );
};

export default SearchBarWithSelect;
