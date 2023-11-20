import { Game } from "@/wrapper/server";

export function getGameSpecialCategoryText(category?: number) {
    const CATEGORY_TO_TEXT = {
        [Game.category._1.valueOf()]: "DLC",
        [Game.category._2.valueOf()]: "DLC",
        [Game.category._3.valueOf()]: "Bundle",
        [Game.category._4.valueOf()]: "Expansion",
        [Game.category._5.valueOf()]: "Mod",
        [Game.category._13.valueOf()]: "Pack",
    };
    if (!category) return undefined;
    return CATEGORY_TO_TEXT[category];
}
