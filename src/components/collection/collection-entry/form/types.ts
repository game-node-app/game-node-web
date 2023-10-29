import { Game } from "@/wrapper";

export interface BaseCollectionEntryChildrenProps {
    onClose?: () => void;
}

export interface BaseCollectionEntryModalProps {
    opened: boolean;
    onClose: () => void;
    id: number;
}
