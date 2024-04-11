import React from "react";
import { useUserLike } from "@/components/statistics/hooks/useUserLike";
import useUserId from "@/components/auth/hooks/useUserId";

interface Props {
    activityId: string;
}

const ActivityActions = ({ activityId }: Props) => {
    const userId = useUserId();
    const x = useUserLike({
        sourceId: activityId,
    });

    return <div></div>;
};

export default ActivityActions;
