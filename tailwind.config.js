/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#CCFF00",
                "primary-dark": "#b3e600",
                "background-main": "#0D0D0D",
                "layer-1": "#141414",
                "layer-2": "#1A1A1A",
                surface: "#1E1E1E",
                "accent-cool": "#5B8CFF",
            },
            fontFamily: {
                serif: ["Playfair Display", "serif"],
                mono: ["Space Mono", "monospace"],
                sans: ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "12px",
                "3xl": "32px",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
