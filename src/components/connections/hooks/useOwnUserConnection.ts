import { useQuery } from "@tanstack/react-query";
import { ConnectionsService } from "@/wrapper/server";
import { ConnectionCreateDto } from "@/wrapper/server";
import type = ConnectionCreateDto.type;

export function useOwnUserConnection(type: type) {
    return useQuery({
        queryKey: ["connections", type],
        queryFn: async () => {
            return ConnectionsService.connectionsControllerFindOwnByType(type);
        },
        retry: 1,
    });
}
