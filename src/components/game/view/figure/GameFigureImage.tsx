import React, {
    ComponentProps,
    ComponentPropsWithoutRef,
    PropsWithChildren,
    useState,
} from "react";
import {
    AspectRatio,
    Box,
    Skeleton,
    Image,
    ImageProps,
    SkeletonProps,
} from "@mantine/core";
import Link from "next/link";
import { getSizedImageUrl } from "@/components/game/util/getSizedImageUrl";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import { getCoverUrl } from "@/components/game/util/getCoverUrl";

export interface IGameFigureProps {
    game: TGameOrSearchGame | undefined;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    skeletonProps?: SkeletonProps;
    imageProps?: ImageProps;
    size: ImageSize;
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
    size,
    onClick,
    skeletonProps,
}: IGameFigureProps) => {
    const coverUrl = getCoverUrl(game);
    const sizedCoverUrl = getSizedImageUrl(coverUrl, size);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const defaultHref = `/game/${game?.id}`;
    return (
        <Link
            href={href ?? defaultHref}
            className="w-full h-auto"
            onClick={onClick}
        >
            {showSkeleton && (
                <Skeleton
                    className="w-full h-auto max-h-[215px]"
                    animate={true}
                    visible={showSkeleton}
                />
            )}
            <AspectRatio ratio={264 / 354} pos="relative" h={"100%"} w={"auto"}>
                <Image
                    src={sizedCoverUrl!}
                    alt={"Game cover"}
                    onLoad={() => setShowSkeleton(false)}
                    onError={() => setShowSkeleton(false)}
                    className="w-full h-auto"
                    {...imageProps}
                />
            </AspectRatio>
        </Link>
    );
};

export default GameFigureImage;
