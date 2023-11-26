import {
    GameSearchRequestDto,
    GameSearchResponseDto,
} from "@/components/game/search/utils/types";
import { useQuery } from "@tanstack/react-query";
import { SearchService } from "@/wrapper/search";

export default function useSearchGames(
    searchParameters: GameSearchRequestDto,
    enabled: boolean = true,
) {
    return useQuery<GameSearchResponseDto>({
        queryKey: ["game", "search", searchParameters],
        queryFn: async (ctx) => {
            return SearchService.postSearch(searchParameters);
        },
        keepPreviousData: true,
        enabled: enabled,
    });
}
