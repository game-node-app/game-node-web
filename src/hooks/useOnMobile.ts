import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

export default function useOnMobile() {
    const theme = useMantineTheme();
    return useMediaQuery(`(max-width: ${theme.breakpoints.sm})`, true);
}
