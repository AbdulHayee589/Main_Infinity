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
                xs: "1.5rem",
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
                    light: "#f5c52d",
                    main: "#F0B90B",
                    dark: "#ddab0a",
                },
                info: {
                    light: "#55a9e1",
                    main: "#3498db",
                    dark: "#268fd6",
                },
                success: {
                    light: "#08e20e",
                    main: "#07bc0c",
                    dark: "#06960a",
                },
                error: {
                    light: "#eb6c5f",
                    main: "#e74c3c",
                    dark: "#e53c2b",
                },
                warning: {
                    light: "#f1d70f",
                    main: "#f1c40f",
                    dark: "#f1b10f",
                },
            },
        },
    },
    plugins: [],
};
