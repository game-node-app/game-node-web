import { Paper, PaperProps, Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

interface Props extends PaperProps {}

const AdminLayoutTabs = ({ ...others }: Props) => {
    const router = useRouter();
    const pathName = router.pathname;

    return (
        <Paper
            styles={{
                root: {
                    backgroundColor: "#161616",
                },
            }}
            className="w-full h-full lg:px-12 py-6"
            {...others}
        >
            <Tabs
                onChange={(v) => {
                    if (v) {
                        router.push(`/admin/${v}`);
                    }
                }}
                classNames={{
                    tab: "border-0 data-[active=true]:text-[#DCDCDC] text-[#828282] text-lg",
                    list: "border-0 before:!content-none",
                }}
            >
                <Tabs.List>
                    <Tabs.Tab
                        data-active={pathName.includes("moderation")}
                        size={"xl"}
                        value={"moderation"}
                    >
                        Moderation
                    </Tabs.Tab>
                    <Tabs.Tab
                        data-active={pathName.includes("achievements")}
                        size={"xl"}
                        value={"achievements"}
                    >
                        Achievements
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </Paper>
    );
};

export default AdminLayoutTabs;
