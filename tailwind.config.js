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
                DEFAULT: "1rem",
                xs: "1.5rem"
            },
        },
        extend: {
            screens: {
                xxs: "375px",
                xs: "425px",
            },
            colors: {
                black: "#17262B",
                gold: {
                    light: "#FCDD5D",
                    main: "#FCD535",
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
