import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#d4b760",
                    main: "#B88E2F",
                    dark: "#8a671f",
                },
                "3e3": "#FFF3E3",
                fcf: "#FCF8F3",
                f9f: "#F9F1E7",
            },
            padding: {
                18: "72px",
            },
        },
    },
    plugins: [],
}
export default config
