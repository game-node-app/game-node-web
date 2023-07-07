/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    corePlugins: {
        preflight: false,
    },

    theme: {
        extend: {
            backgroundImage: {
                mobile: "url('/img/mobile-bg.jpg')",
                desktop: "url('/img/desktop-bg.png')",
            },
            fontFamily: "var(--mantine-font-family)",
            spacing: {
                xs: "var(--mantine-spacing-xs)",
                sm: "var(--mantine-spacing-sm)",
                md: "var(--mantine-spacing-md)",
                lg: "var(--mantine-spacing-lg)",
                xl: "var(--mantine-spacing-xl)",
            },
            borderRadius: {
                xs: "var(--mantine-radius-xs)",
                sm: "var(--mantine-radius-sm)",
                md: "var(--mantine-radius-md)",
                lg: "var(--mantine-radius-lg)",
                xl: "var(--mantine-radius-xl)",
            },
            screens: {
                xs: "30em",
                sm: "48em",
                md: "64em",
                lg: "74em",
                xl: "90em",
            },
            fontSize: {
                xs: "var(--mantine-font-size-xs)",
                sm: "var(--mantine-font-size-sm)",
                md: "var(--mantine-font-size-md)",
                lg: "var(--mantine-font-size-lg)",
                xl: "var(--mantine-font-size-xl)",
            },
            colors: {
                brand: [
                    "#F8F5F4",
                    "#E9DBD7",
                    "#DEC1B9",
                    "#D9A799",
                    "#D98C77",
                    "#E16F51",
                    "#F15025",
                    "#D54A25",
                    "#B04C31",
                    "#934B38",
                ],
            },
        },
    },
};
