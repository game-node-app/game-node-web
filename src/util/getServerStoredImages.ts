import { serverUrl } from "@/util/constants";

export function getServerStoredUpload(filename: string) {
    return `${serverUrl}/v1/public/uploads/${filename}`;
}

/**
 * Extension '.png' is appended by default at the end of filename.
 * @param filename
 */
export function getServerStoredIcon(filename: string) {
    return `${serverUrl}/v1/public/icons/${filename}.png`;
}
