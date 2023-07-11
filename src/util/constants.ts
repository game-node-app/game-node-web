export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL as string;

if (!serverUrl) {
    throw new Error("NEXT_PUBLIC_SERVER_URL is not defined");
}
