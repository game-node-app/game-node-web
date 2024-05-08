import { useQuery } from "@tanstack/react-query";
import { ImporterService } from "@/wrapper/server";

interface Props {
    source: string;
    limit?: number;
    offset?: number;
}

export function useImporterEntries({ source, offset, limit }: Props) {
    return useQuery({
        queryKey: ["importer", "entries", "unprocessed", source, offset, limit],
        queryFn: async () => {
            return ImporterService.importerControllerFindUnprocessedEntries(
                source,
                limit,
                offset,
            );
        },
        enabled: source != undefined,
    });
}
