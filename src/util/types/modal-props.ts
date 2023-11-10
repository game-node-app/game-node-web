import { Game } from "@/wrapper/server";

export interface BaseModalChildrenProps {
    onClose?: () => void;
}

export interface BaseModalProps {
    opened: boolean;
    onClose: () => void;
}
