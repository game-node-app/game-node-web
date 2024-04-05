import {
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
import { useDebouncedValue } from "@mantine/hooks";
import useSearchGames from "@/components/game/hooks/useSearchGames";
import { useSearchUsers } from "@/components/profile/hooks/useSearchUsers";
import React, { ReactElement, useMemo } from "react";
import GameSelectOption from "@/components/general/shell/GlobalShellNavbar/search-bar/GameSelectOption";
import { IconLoader, IconSearch, IconX } from "@tabler/icons-react";
import UserSelectOption from "@/components/general/shell/GlobalShellNavbar/search-bar/UserSelectOption";

interface IUserGamesSearchBarWithSelectProps extends TextInputProps {
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

const GlobalNavbarSearchBar = ({
    withButton,
    value,
    onOptionSubmit,
    onClear,
    ...others
}: IUserGamesSearchBarWithSelectProps) => {
    const combobox = useCombobox();
    const [debouncedQuery] = useDebouncedValue(value, 400);
    const isQueryEnabled =
        debouncedQuery != undefined && debouncedQuery.length > 2;
    const searchGamesQuery = useSearchGames(
        {
            query: debouncedQuery,
            limit: 5,
        },
        isQueryEnabled,
    );
    const searchUsersQuery = useSearchUsers({
        query: debouncedQuery,
        limit: 5,
    });

    // Who thought this was a good idea?
    // Oh, it was me...
    const isGamesEmpty =
        searchGamesQuery.data == undefined ||
        searchGamesQuery.data.data == undefined ||
        searchGamesQuery.data.data.items == undefined;
    const isUsersEmpty =
        searchUsersQuery.data == undefined ||
        searchUsersQuery.data.data == undefined ||
        searchUsersQuery.data.data.items == undefined;

    const isLoading = searchUsersQuery.isLoading || searchGamesQuery.isLoading;
    const isError = searchGamesQuery.isError && searchUsersQuery.isError;
    const isEmpty = isGamesEmpty && isUsersEmpty;

    const options = useMemo(() => {
        if (isEmpty) return undefined;
        const options: ReactElement[] = [];
        searchGamesQuery.data?.data?.items?.forEach((game) => {
            options.push(<GameSelectOption key={game.id} game={game} />);
        });
        searchUsersQuery.data?.data?.items?.forEach((user) => {
            options.push(<UserSelectOption userId={user.userId!} />);
        });

        return options;
    }, [
        isEmpty,
        searchGamesQuery.data?.data?.items,
        searchUsersQuery.data?.data?.items,
    ]);

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
                        placeholder={"Search for users or games"}
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
                    />
                </Combobox.Target>

                <Combobox.Dropdown hidden={!isQueryEnabled}>
                    <Combobox.Options>
                        <ScrollArea.Autosize h={400}>
                            {options}
                            {isError && (
                                <Combobox.Empty>
                                    Failed to fetch results.
                                </Combobox.Empty>
                            )}
                            {!isLoading && !isError && isEmpty && (
                                <Combobox.Empty>No results.</Combobox.Empty>
                            )}
                        </ScrollArea.Autosize>
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </Group>
    );
};
export default GlobalNavbarSearchBar;
