import React from "react";
import { ComboboxItem, Select } from "@mantine/core";
import {
    PreferencesActiveItem,
    preferencesCategories,
} from "@/components/preferences/PreferencesScreenSideBar";

interface Props {
    activeItem: PreferencesActiveItem;
    onChange: (item: PreferencesActiveItem) => void;
}

const PreferencesScreenSelector = ({ activeItem, onChange }: Props) => {
    const data = preferencesCategories.map((item): ComboboxItem => {
        return {
            label: item.name,
            value: item.activeItemName,
        };
    });
    return (
        <Select
            className={"w-full"}
            data={data}
            value={activeItem}
            onChange={(item) => onChange(item as PreferencesActiveItem)}
        />
    );
};

export default PreferencesScreenSelector;
