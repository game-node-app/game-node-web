import { useContext } from "react";
import { UserInfoContext } from "@/components/auth/UserInfoProvider";

export default function useUserInfo() {
    return useContext(UserInfoContext);
}
