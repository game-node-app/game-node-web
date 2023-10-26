import React from "react";
import { TPaginationInfo } from "@/util/types/pagination";
import { Center, Pagination, PaginationProps } from "@mantine/core";

interface IGameViewPaginationProps extends Omit<PaginationProps, "total"> {
    pagination?: TPaginationInfo;
}

const GameViewPagination = ({
    pagination,
    onChange,
    ...others
}: IGameViewPaginationProps) => {
    return (
        <Center w={"100%"}>
            <Pagination
                {...others}
                total={pagination?.totalPages || 1}
                onChange={onChange}
            />
        </Center>
    );
};

export default GameViewPagination;
