import { Rating, RatingProps } from "@mantine/core";
import React from "react";

interface Props extends RatingProps {
    /**
     * Value is mandatory.
     */
    value: number;
}

/**
 * Common rating component to be used by all "start" based rating screens. <br>
 * Read-only by default.
 * @param props
 * @constructor
 */
const GameRating = (props: Props) => {
    return (
        <Rating
            fractions={2}
            size={"lg"}
            readOnly
            color={"#F15025"}
            {...props}
        />
    );
};

export default GameRating;
