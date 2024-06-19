import React from "react";
import { Report } from "@/wrapper/server";
import { Divider, Stack, Text } from "@mantine/core";
import reportCategoryToString from "@/components/report/util/reportCategoryToString";

interface Props {
    reportId: number;
    category: Report.category;
}

const ModerationReportIdentifier = ({ reportId, category }: Props) => {
    return (
        <Stack className={"w-full gap-2"}>
            <div>
                <Text span className={"w-fit"}>
                    Category:{" "}
                </Text>
                <Text span className={"font-bold"}>
                    {reportCategoryToString(category)}
                </Text>
            </div>

            <Divider />
            <div>
                <Text span className={"w-fit"}>
                    Report ID:{" "}
                </Text>
                <Text span className={"font-bold"}>
                    {reportId}
                </Text>
            </div>
        </Stack>
    );
};

export default ModerationReportIdentifier;
