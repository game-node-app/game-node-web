import { createTheme, DEFAULT_THEME, mergeMantineTheme } from "@mantine/core";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const themeOverride = createTheme({
    fontFamily: inter.style.fontFamily,
    colors: {
        brand: [
            "#ffede5",
            "#ffd9cf",
            "#fbb3a0",
            "#f7896d",
            "#f36742",
            "#f15126",
            "#f14517",
            "#d6360b",
            "#c02d06",
            "#a82301",
        ],
    },
    primaryColor: "brand",
});
export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
