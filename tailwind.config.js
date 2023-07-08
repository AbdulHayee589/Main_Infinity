/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1.5rem",
            },
        },
        extend: {
            screens: {
                xxs: "375px",
                xs: "425px",
            },
            colors: {
                //temp
                lightGray: "#f1f4f8",
                primary: {
                    light: "#3d8eff",
                    main: "#0D72FF",
                    dark: "#0a5bcc",
                },
                secondary: {
                    light: "#d0d8e3",
                    main: "#b7c3d5",
                    dark: "#7F8C9F",
                },
                //temp
                black: "#181a20",
                gold: {
                    light: "#FCD535",
                    main: "#F2BC07",
                    dark: "#F0B90B",
                },
                success: {
                    light: "#6fbf73",
                    main: "#4caf50",
                    dark: "#357a38",
                },
                error: {
                    light: "#f6685e",
                    main: "#f44336",
                    dark: "#aa2e25",
                },
                warning: {
                    light: "#fde68a",
                    main: "#fbbf24",
                    dark: "#d97706",
                },
            },
        },
    },
    plugins: [],
};
