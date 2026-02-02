/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                cyberbg: "#05060a",
                cyberpanel: "#0b0f1a",
                cyberborder: "#20253a",
                neon1: "#00ffd5",
                neon2: "#7c3aed",
                neon3: "#00ff6a",
                danger: "#ff2e63",
                muted: "#9aa4c0"
            },
            boxShadow: {
                neon: "0 0 18px rgba(0,255,213,0.35)",
                purple: "0 0 18px rgba(124,58,237,0.35)",
                danger: "0 0 18px rgba(255,46,99,0.35)"
            }
        }
    },
    plugins: []
};