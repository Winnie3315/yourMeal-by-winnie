import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        "max-1200": {'max': '1200px'},
        'max-992': {'max': '992px'},
        'max-768': {'max': '768px'},
        'max-576': {'max': '576px'},
      }
    },
  },
  plugins: [],
};
export default config;