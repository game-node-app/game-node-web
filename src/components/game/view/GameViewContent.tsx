import React, { useContext } from "react";
import { Divider, Grid } from "@mantine/core";
import { GameViewContext } from "@/components/game/view/GameView";
import GameGridFigure from "@/components/game/view/figure/GameGridFigure";
import GameListFigure from "@/components/game/view/figure/GameListFigure";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";

interface IMetadataGridContentProps {
    items: TGameOrSearchGame[];
}

const GameViewContent = ({ items }: IMetadataGridContentProps) => {
    const { layout } = useContext(GameViewContext);
    const buildColumns = () => {
        if (items == null || items.length === 0) {
            return null;
        }

        return items.map((item) => {
            if (layout === "list") {
                return (
                    <Grid.Col key={item.id} span={12} h={"100%"}>
                        <GameListFigure
                            size={ImageSize.COVER_BIG}
                            game={item}
                        />
                        <Divider mt={"xs"} variant={"dashed"} />
                    </Grid.Col>
                );
            }

            return (
                <Grid.Col key={item.id} span={{ xs: 6, lg: 2 }}>
                    <GameGridFigure size={ImageSize.COVER_BIG} game={item} />
                </Grid.Col>
            );
        });
    };
    return (
        <Grid columns={12} align="start" justify="center" w={"100%"} h={"100%"}>
            {buildColumns()}
        </Grid>
    );
};

export default GameViewContent;
