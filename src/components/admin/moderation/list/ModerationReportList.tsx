import React, { useMemo, useState } from "react";
import { Button, Stack, Text } from "@mantine/core";
import { useReports } from "@/components/report/hooks/useReports";
import ModerationReportListItem from "@/components/admin/moderation/list/ModerationReportListItem";
import CenteredLoading from "@/components/general/CenteredLoading";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";

const DEFAULT_LIMIT = 10;

const ModerationReportList = () => {
    const [limit, setLimit] = useState(DEFAULT_LIMIT);
    const reportsQuery = useReports(0, limit);
    const items = useMemo(() => {
        if (reportsQuery.data == undefined) {
            return undefined;
        }
        return reportsQuery.data.data.map((report, index) => {
            const evenIndexItem = index % 2 === 0;
            return (
                <ModerationReportListItem
                    styles={{
                        root: {
                            backgroundColor: evenIndexItem
                                ? "#161616"
                                : "#181818",
                        },
                    }}
                    key={report.id}
                    item={report}
                />
            );
        });
    }, [reportsQuery.data]);

    return (
        <Stack className={"w-full h-full gap-0.5 items-center"}>
            {reportsQuery.isLoading && <CenteredLoading className={"mt-8"} />}
            {reportsQuery.isError && (
                <CenteredErrorMessage
                    message={"Error while fetching reports. Please try again."}
                />
            )}
            {reportsQuery.isSuccess &&
                reportsQuery.data?.data?.length === 0 && (
                    <Text className={"mt-2"}>
                        No reports to show. Good work!
                    </Text>
                )}

            {items}
            {reportsQuery.data?.pagination.hasNextPage && (
                <Button
                    className={"mt-3"}
                    onClick={() => {
                        setLimit(limit + DEFAULT_LIMIT);
                    }}
                    loading={reportsQuery.isLoading}
                >
                    Show more
                </Button>
            )}
        </Stack>
    );
};

export default ModerationReportList;
