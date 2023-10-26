import { Game, GameSearchResponseHit, SearchGame } from "@/wrapper";
import { TGameOrSearchGame } from "@/components/game/util/types";

export function isGameSearchObject(
    game: TGameOrSearchGame,
): game is SearchGame {
    return (game as SearchGame).source === SearchGame.source.MANTICORE;
}

export function isGameObject(game: TGameOrSearchGame): game is Game {
    return (game as Game).source === Game.source.MYSQL;
}
