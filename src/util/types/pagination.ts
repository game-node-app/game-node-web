import { PaginationInfo } from "@/wrapper/server";
import { schema_PaginationInfo } from "@/wrapper/search";

export type PaginationInfoDto = PaginationInfo | schema_PaginationInfo;
