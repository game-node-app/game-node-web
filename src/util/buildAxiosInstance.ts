import axios, { AxiosInstance } from "axios";
import { serverUrl } from "@/util/constants";

export default function buildAxiosInstance(): AxiosInstance {
    return axios.create({
        baseURL: serverUrl,
        withCredentials: true,
    });
}
