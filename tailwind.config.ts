import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/layout/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      // => @media (min-width: 640px) { ... }
      sm: "640px",
      // => @media (min-width: 768px) { ... }
      md: "768px",
      // => @media (min-width: 1024px) { ... }
      lg: "1024px",
      // => @media (min-width: 1280px) { ... }
      xl: "1280px",
      // => @media (min-width: 1536px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "4k": "2159px",
    },
  },
  plugins: [],
};
export default config;
