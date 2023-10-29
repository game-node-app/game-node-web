import {
    Game,
    GameRepositoryRequestDto,
    GameRepositoryService,
} from "@/wrapper";

export async function getGameInfo(
    id: number,
    dto?: GameRepositoryRequestDto,
): Promise<Game | undefined> {
    if (!dto) {
        dto = {};
    }
    try {
        const game =
            await GameRepositoryService.gameRepositoryControllerFindOneById(
                id,
                dto,
            );
        return game;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}
