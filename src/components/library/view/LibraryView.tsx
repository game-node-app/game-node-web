import React, { PropsWithChildren } from "react";
import LibraryViewSidebar from "@/components/library/view/sidebar/LibraryViewSidebar";
import useOnMobile from "@/hooks/useOnMobile";
import { Container, Grid } from "@mantine/core";

interface ILibraryViewProps extends PropsWithChildren {
    userId: string | undefined;
}

/**
 * LibraryView should be used in any page that renders under the /library route.
 * It provides a sidebar on desktop and a bottom navigation on mobile.
 * @param children - The main content to render (e.g. a collection entries listing).
 * @constructor
 */
const LibraryView = ({ children, userId }: ILibraryViewProps) => {
    const onMobile = useOnMobile();

    return (
        <Container fluid pl={onMobile ? undefined : 0}>
            <Grid columns={12}>
                <Grid.Col
                    span={{ base: 0, lg: 2 }}
                    display={onMobile ? "none" : undefined}
                >
                    <LibraryViewSidebar userId={userId} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 10 }}>{children}</Grid.Col>
            </Grid>
        </Container>
    );
};

export default LibraryView;
