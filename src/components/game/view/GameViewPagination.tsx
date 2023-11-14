import React from "react";
import { Center, Pagination, PaginationProps } from "@mantine/core";
import { PaginationInfo } from "@/wrapper/server";
import { PaginationInfoDto } from "@/util/types/pagination";

export interface IGameViewPaginationProps {
    paginationInfo: PaginationInfoDto | undefined;
    onPaginationChange: (page: number) => void;
}

const GameViewPagination = ({
    paginationInfo,
    onPaginationChange,
}: IGameViewPaginationProps) => {
    const [page, setPage] = React.useState(1);

    /**
     * @param page
     */
    const handlePagination = (page: number) => {
        onPaginationChange(page);
        setPage(page);
    };

    return (
        <Center w={"100%"}>
            <Pagination
                value={page}
                total={paginationInfo?.totalPages || 1}
                onChange={handlePagination}
            />
        </Center>
    );
};

export default GameViewPagination;
