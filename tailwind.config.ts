import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        background: "#fafafa",
        foreground: "#222222",
        neutral: {
          50: "#fafafa",
          100: "#f1f1f1",
          200: "#e0e0e0",
          300: "#cbcbcb",
          400: "#999999",
          500: "#6a6a6a",
          600: "#4c4c4c",
          700: "#393939",
          800: "#222222",
          900: "#181818",
        },
        smMain: {
          50: "#f0f5f7",
          100: "#dfeaf0",
          200: "#b4cbd9",
          300: "#8caac2",
          400: "#4d7096",
          500: "#1f3b69",
          600: "#19335e",
          700: "#11264f",
          800: "#0b1b40",
          900: "#06112e",
          950: "#030a1f",
        },
        ebError: {
          500: "#d45b5b",
        },
      },
      boxShadow: {
        sidebar: "0 4px 16px 0 rgb(96 101 123 / 14%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
} satisfies Config;
