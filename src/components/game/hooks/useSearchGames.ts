import {
    GameSearchRequestDto,
    GameSearchResponseDto,
} from "@/components/game/search/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiError, SearchService } from "@/wrapper/search";

const parseDto = (dto: GameSearchRequestDto) => {
    const parsedDto = structuredClone(dto);
    if (typeof parsedDto.page === "string") {
        parsedDto.page = parseInt(parsedDto.page, 10);
    }
    if (typeof parsedDto.limit === "string") {
        parsedDto.limit = parseInt(parsedDto.limit, 10);
    }

    return parsedDto;
};

export default function useSearchGames(
    searchParameters: GameSearchRequestDto,
    enabled: boolean = true,
) {
    return useQuery<GameSearchResponseDto, ApiError>({
        queryKey: ["game", "search", searchParameters],
        queryFn: async (ctx) => {
            return SearchService.postSearch(parseDto(searchParameters));
        },
        placeholderData: keepPreviousData,
        enabled: enabled,
    });
}
