import React from "react";
import { ActionIcon, Button, Group, Tooltip } from "@mantine/core";
import { IconHeartFilled, IconHeartPlus, IconX } from "@tabler/icons-react";
import useQueryWithParameters from "@/hooks/useQueryWithParameters";
import useUserInfo from "@/hooks/useUserInfo";
import { findEntryInFavorites, findEntryInLibrary } from "@/util/findInLibrary";
import GameAddModal from "@/components/game/form/modal/GameAddModal";
import { useDisclosure } from "@mantine/hooks";
import { Game } from "@/wrapper";

interface IGameViewActionsProps {
    wrapperProps?: React.ComponentPropsWithoutRef<typeof Group>;
    game: Game;
}

/**
 * Component that handles the library-related actions for a game.
 * The game add modal is handled here.
 * @constructor
 */
const GameInfoActions = ({ game, wrapperProps }: IGameViewActionsProps) => {
    const [modalOpened, { close, open }] = useDisclosure();
    const userInfo = useUserInfo();
    const entryInLibrary = findEntryInLibrary(userInfo.userLibrary, game.id);
    const entryInFavorites = findEntryInFavorites(
        userInfo.userLibrary,
        game.id,
    );
    return (
        <Group gap={"0.725rem"} {...wrapperProps}>
            <GameAddModal
                opened={modalOpened}
                onClose={close}
                metadata={game}
            />
            <Button disabled={entryInLibrary != undefined} onClick={open}>
                {entryInLibrary != undefined
                    ? "On your library"
                    : "Add to library"}
            </Button>
            <Tooltip label={"Add to your favorites"}>
                <ActionIcon size="lg" variant="default">
                    {entryInFavorites != undefined ? (
                        <IconHeartFilled size={"1.05rem"} />
                    ) : (
                        <IconHeartPlus size={"1.05rem"} />
                    )}
                </ActionIcon>
            </Tooltip>
            {entryInLibrary != undefined && (
                <Tooltip label={"Remove from your library"}>
                    <ActionIcon variant="default" size="lg">
                        <IconX color="red" />
                    </ActionIcon>
                </Tooltip>
            )}
        </Group>
    );
};

export default GameInfoActions;
