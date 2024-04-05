import React, { PropsWithChildren, useEffect, useState } from "react";
import {
    AspectRatio,
    Image,
    ImageProps,
    Skeleton,
    SkeletonProps,
} from "@mantine/core";
import Link from "next/link";
import {
    getSizedImageUrl,
    ImageSize,
} from "@/components/game/util/getSizedImageUrl";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { getCoverUrl } from "@/components/game/util/getCoverUrl";

export interface IGameFigureProps extends PropsWithChildren {
    game: TGameOrSearchGame | undefined;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    imageProps?: ImageProps;
    href?: string;
}

/**
 * This component is the base building block for anything related to showing a game's metadata.
 * It only handles logic related to image loading (skeletons, etc.).
 *
 * @param metadata
 * @param href
 * @constructor
 */
const GameFigureImage = ({
    game,
    imageProps,
    href,
    onClick,
    children,
}: IGameFigureProps) => {
    const coverUrl = getCoverUrl(game);
    const sizedCoverUrl = getSizedImageUrl(coverUrl, ImageSize.COVER_BIG);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const defaultHref = `/game/${game?.id}`;
    useEffect(() => {
        if (showSkeleton) {
            setShowSkeleton(false);
        }
    }, [showSkeleton, game?.id]);
    return (
        <Link
            href={href ?? defaultHref}
            className="w-full h-auto"
            onClick={onClick}
        >
            <AspectRatio ratio={264 / 354} pos="relative" h={"100%"} w={"auto"}>
                <Skeleton animate visible={showSkeleton} className={"z-10"} />
                <Image
                    radius={"sm"}
                    src={sizedCoverUrl ?? "/img/game_placeholder.jpeg"}
                    alt={"Game cover"}
                    onLoad={() => setShowSkeleton(false)}
                    onError={() => setShowSkeleton(false)}
                    className="w-full h-auto max-h-full"
                    {...imageProps}
                />
                {children}
            </AspectRatio>
        </Link>
    );
};

export default GameFigureImage;
