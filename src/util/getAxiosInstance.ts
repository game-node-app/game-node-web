import axios, { AxiosInstance } from "axios";
import { serverUrl } from "@/util/constants";

export default function getAxiosInstance(): AxiosInstance {
    return axios.create({
        baseURL: serverUrl,
        withCredentials: true,
    });
}
