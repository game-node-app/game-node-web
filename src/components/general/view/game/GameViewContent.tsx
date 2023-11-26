import React, { useContext, useMemo } from "react";
import { Box, Divider, SimpleGrid, SimpleGridProps } from "@mantine/core";
import { GameViewContext } from "@/components/general/view/game/GameView";
import GameGridFigure from "@/components/game/figure/GameGridFigure";
import GameListFigure from "@/components/game/figure/GameListFigure";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import { SearchGame } from "@/components/game/search/utils/types";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { Game } from "@/wrapper/server";

interface IMetadataGridContentProps extends SimpleGridProps {
    items: TGameOrSearchGame[];
    badgesBuilder?: (game: TGameOrSearchGame) => React.ReactNode[] | null;
}

const GameViewContent = ({
    items,
    badgesBuilder,
    ...others
}: IMetadataGridContentProps) => {
    const onMobile = useOnMobile();
    const { layout } = useContext(GameViewContext);
    const columns = useMemo(() => {
        if (items == null || items.length === 0) {
            return null;
        }
        return items.map((item) => {
            if (layout === "list") {
                return (
                    <Box w={"100%"} key={item.id}>
                        <GameListFigure
                            badgesBuilder={badgesBuilder}
                            figureProps={{
                                size: ImageSize.COVER_BIG,
                            }}
                            game={item}
                        />
                        <Divider mt={"xs"} variant={"dashed"} />
                    </Box>
                );
            }

            return (
                <GameGridFigure
                    key={item.id}
                    figureProps={{
                        size: ImageSize.COVER_BIG,
                    }}
                    game={item}
                />
            );
        });
    }, [items, layout, badgesBuilder]);

    return (
        <SimpleGrid
            id={"game-view-content"}
            cols={{
                base: layout === "list" ? 1 : 2,
                lg: layout === "list" ? 1 : 5,
            }}
            w={"100%"}
            h={"100%"}
            {...others}
        >
            {columns}
        </SimpleGrid>
    );
};

export default GameViewContent;
