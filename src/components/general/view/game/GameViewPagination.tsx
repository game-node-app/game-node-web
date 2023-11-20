import React from "react";
import { Center, Pagination, PaginationProps } from "@mantine/core";
import { PaginationInfo } from "@/wrapper/server";
import { PaginationInfoDto } from "@/util/types/pagination";

export interface IGameViewPaginationProps {
    page: number;
    paginationInfo: PaginationInfoDto | undefined;
    onPaginationChange: (page: number) => void;
}

const GameViewPagination = ({
    page,
    paginationInfo,
    onPaginationChange,
}: IGameViewPaginationProps) => {
    return (
        <Center w={"100%"}>
            <Pagination
                value={page}
                total={paginationInfo?.totalPages || 1}
                onChange={onPaginationChange}
            />
        </Center>
    );
};

export default GameViewPagination;
