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
        ebGreen: {
          DEFAULT: "#00b7ad",
          50: "#f0fdfb",
          100: "#cbfbf4",
          200: "#96f5ea",
          300: "#58e9dc",
          400: "#22d3c7",
          500: "#00b7ad",
          600: "#01938e",
          700: "#097573",
          800: "#0e5e5d",
          900: "#114e4d",
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
