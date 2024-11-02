import { ApiError } from "@/wrapper/search";

export function getErrorMessage(err: Error | ApiError): string {
    if (err instanceof ApiError) {
        if (err.body && err.body.message) {
            return err.body.message;
        }
    }

    return err.message;
}
