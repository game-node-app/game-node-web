import { ActionIcon, Menu } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import { IconDots } from "@tabler/icons-react";
import ItemDropdownEditButton from "@/components/general/input/dropdown/ItemDropdownEditButton";
import ItemDropdownRemoveButton from "@/components/general/input/dropdown/ItemDropdownRemoveButton";
import ItemDropdownReportButton from "@/components/general/input/dropdown/ItemDropdownReportButton";

/**
 * Common component to build dropdown actions for specific components.
 * E.g. the review list items' dropdown.
 * @param children
 * @constructor
 */
const ItemDropdown = ({ children }: PropsWithChildren) => {
    return (
        <Menu shadow={"md"} width={200} position={"left"}>
            <Menu.Target>
                <ActionIcon variant={"subtle"} c={"white"}>
                    <IconDots />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                {children}
            </Menu.Dropdown>
        </Menu>
    );
};

ItemDropdown.EditButton = ItemDropdownEditButton;
ItemDropdown.RemoveButton = ItemDropdownRemoveButton;
ItemDropdown.ReportButton = ItemDropdownReportButton;

export default ItemDropdown;
