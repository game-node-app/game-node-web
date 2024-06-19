import React from "react";
import { Report } from "@/wrapper/server";
import { Box, Divider, Group, GroupProps, Stack, Text } from "@mantine/core";
import { IconAlertCircle, IconArrowBadgeRight } from "@tabler/icons-react";
import Link from "next/link";
import ModerationReportIdentifier from "@/components/admin/moderation/list/ModerationReportIdentifier";

interface Props extends GroupProps {
    item: Report;
}

const ModerationReportListItem = ({ item, ...groupProps }: Props) => {
    return (
        <Link href={`/admin/moderation/${item.id}`} className={"w-full h-full"}>
            <Group className={"w-full ps-4 py-3"} {...groupProps}>
                <IconAlertCircle size={"3rem"} className={"text-brand-4"} />
                <Box className={"w-6/12"}>
                    <ModerationReportIdentifier
                        reportId={item.id}
                        category={item.category}
                    />
                </Box>

                <IconArrowBadgeRight className={"ms-auto"} size={"2rem"} />
            </Group>
        </Link>
    );
};

export default ModerationReportListItem;
