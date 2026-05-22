import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#f4f5f9",
          dark: "#0f0e17",
        },
        "heading-base": "#7a7da8",
        "heading-base-dark": "#c8cadf",
        "heading-emphasis": "#585e91",
        "heading-emphasis-dark": "#eceef8",
        "sub-blue": "#6b7199",
        "sub-blue-dark": "#8b92b8",
        "blob-capsule": "#dfe5ff",
        "blob-capsule-dark": "#252838",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
