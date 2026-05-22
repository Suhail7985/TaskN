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
          DEFAULT: "#f8f9fe",
          dark: "#09080f",
        },
        "heading-base": "#5c5f9a",
        "heading-base-dark": "#d0d2f0",
        "sub-blue": "#4a54ff",
        "sub-blue-dark": "#9aa3ff",
        "blob-capsule": "#c5d0ff",
        "blob-capsule-dark": "#3d4468",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
