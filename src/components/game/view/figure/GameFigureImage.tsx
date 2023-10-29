import React, {
    ComponentProps,
    ComponentPropsWithoutRef,
    PropsWithChildren,
    useState,
} from "react";
import { AspectRatio, Box, Skeleton, Image, ImageProps } from "@mantine/core";
import Link from "next/link";
import { getSizedImageUrl } from "@/components/game/util/getSizedImageUrl";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import { getCoverUrl } from "@/components/game/util/getCoverUrl";

export interface IGameFigureProps extends PropsWithChildren<ImageProps> {
    game: TGameOrSearchGame | undefined;
    isLoading?: boolean;
    size: ImageSize;
    href?: string;
}

/**
 * This component is the base building block for anything related to showing a game's metadata.
 * It only handles logic related to image loading (skeletons, etc.).
 *
 * @param metadata
 * @param children
 * @param href
 * @constructor
 */
const GameFigureImage = ({
    game,
    children,
    isLoading,
    href,
    size,
    ...others
}: IGameFigureProps) => {
    const coverUrl = getCoverUrl(game);
    const sizedCoverUrl = getSizedImageUrl(coverUrl, size);
    const [showSkeleton, setShowSkeleton] = useState(isLoading);
    const defaultHref = `/game/${game?.id}`;
    return (
        <Link href={defaultHref} className="w-full h-fit h-fit max-w-[22rem]">
            {showSkeleton && (
                <Skeleton
                    className="w-full h-full min-h-[10rem] lg:min-h-[18rem]"
                    animate={true}
                    visible={showSkeleton}
                />
            )}
            <AspectRatio ratio={264 / 354} pos="relative">
                <Image
                    src={sizedCoverUrl!}
                    alt={game?.name ?? "Game cover"}
                    onLoad={() => setShowSkeleton(false)}
                    onError={() => setShowSkeleton(false)}
                    className="w-full h-full object-cover"
                    {...others}
                />
                {children}
            </AspectRatio>
        </Link>
    );
};

export default GameFigureImage;
