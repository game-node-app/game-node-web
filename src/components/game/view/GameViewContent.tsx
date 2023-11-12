import React, { useContext } from "react";
import {
    Box,
    Divider,
    Grid,
    GridProps,
    SimpleGrid,
    SimpleGridProps,
} from "@mantine/core";
import { GameViewContext } from "@/components/game/view/GameView";
import GameGridFigure from "@/components/game/view/figure/GameGridFigure";
import GameListFigure from "@/components/game/view/figure/GameListFigure";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import { SearchGame } from "@/components/game/search/utils/types";
import useOnMobile from "@/hooks/useOnMobile";

interface IMetadataGridContentProps extends SimpleGridProps {
    items: TGameOrSearchGame[];
}

const GameViewContent = ({ items, ...others }: IMetadataGridContentProps) => {
    const onMobile = useOnMobile();
    const { layout } = useContext(GameViewContext);
    const buildColumns = () => {
        if (items == null || items.length === 0) {
            return null;
        }

        return items.map((item: SearchGame) => {
            if (layout === "list") {
                return (
                    <Box w={"100%"} key={item.id}>
                        <GameListFigure
                            size={ImageSize.COVER_BIG}
                            game={item}
                        />
                        <Divider mt={"xs"} variant={"dashed"} />
                    </Box>
                );
            }

            return (
                <GameGridFigure
                    key={item.id}
                    size={ImageSize.COVER_BIG}
                    game={item}
                />
            );
        });
    };

    return (
        <SimpleGrid
            id={"game-view-content"}
            cols={{
                base: layout === "list" ? 1 : 2,
                lg: layout === "list" ? 1 : 4,
            }}
            w={"100%"}
            h={"100%"}
            {...others}
        >
            {buildColumns()}
        </SimpleGrid>
    );
};

export default GameViewContent;
