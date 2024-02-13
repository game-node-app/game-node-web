import { StatisticsActionDto } from "@/wrapper/server";

export type StatisticsSourceType = Lowercase<
    keyof typeof StatisticsActionDto.sourceType
>;
