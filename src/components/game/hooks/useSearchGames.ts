import {
    GameSearchRequestDto,
    GameSearchResponseDto,
} from "@/components/game/search/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiError, SearchService } from "@/wrapper/search";

export default function useSearchGames(
    searchParameters: GameSearchRequestDto,
    enabled: boolean = true,
) {
    return useQuery<GameSearchResponseDto, ApiError>({
        queryKey: ["game", "search", searchParameters],
        queryFn: async (ctx) => {
            return SearchService.postSearch(searchParameters);
        },
        placeholderData: keepPreviousData,
        enabled: enabled,
    });
}
