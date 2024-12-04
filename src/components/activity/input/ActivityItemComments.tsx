import React from "react";
import ItemCommentsButton from "@/components/comment/input/ItemCommentsButton";
import { Activity, FindAllCommentsDto } from "@/wrapper/server";
import sourceType = FindAllCommentsDto.sourceType;
import { useDisclosure } from "@mantine/hooks";

interface Props {
    activity: Activity;
}

const ActivityItemComments = ({ activity }: Props) => {
    const [commentsModalOpened, commentsModalUtils] = useDisclosure();

    return (
        <ItemCommentsButton
            sourceType={sourceType.ACTIVITY}
            sourceId={activity.id}
            onClick={commentsModalUtils.open}
        ></ItemCommentsButton>
    );
};

export default ActivityItemComments;
