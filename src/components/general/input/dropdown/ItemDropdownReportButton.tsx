import React from "react";
import { ItemDropdownButtonProps } from "@/components/general/input/dropdown/types";
import { IconBan } from "@tabler/icons-react";
import { Menu } from "@mantine/core";

interface Props extends ItemDropdownButtonProps {}

const ItemDropdownReportButton = ({ onClick, disabled }: Props) => {
    return (
        <Menu.Item
            onClick={onClick}
            leftSection={<IconBan size={"1rem"} />}
            disabled={disabled}
        >
            Report
        </Menu.Item>
    );
};

export default ItemDropdownReportButton;
