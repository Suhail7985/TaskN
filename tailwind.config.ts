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
          DEFAULT: "#f4f4f8",
          dark: "#12111a",
        },
        "heading-base": "#7d7db0",
        "heading-base-dark": "#9b9cc4",
        "sub-blue": "#5f67ff",
        "sub-blue-dark": "#7b84ff",
        "blob-capsule": "#dfe5ff",
        "blob-capsule-dark": "#2a2d47",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
