import {
    schema_GameSearchRequestDto,
    schema_GameSearchResponseDto,
    schema_PaginationInfo,
    schema_ResponseData,
    schema_SearchGame,
} from "@/wrapper/search";
import { PaginationInfoDto } from "@/wrapper/server";

export type SearchGame = schema_SearchGame;
export type GameSearchRequestDto = schema_GameSearchRequestDto;
export type GameSearchResponseDto = schema_GameSearchResponseDto;
export type GameSearchResponseData = schema_ResponseData;
export type GameSearchPaginationInfo = schema_PaginationInfo;
