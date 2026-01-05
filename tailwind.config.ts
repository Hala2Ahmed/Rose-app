import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        maroon: {
          50: "#FBEAEA",
          100: "#F3C5C7",
          200: "#EA9FA2",
          300: "#E07A7D",
          400: "#D75458",
          500: "#CD2E33",
          600: "#A6252A",
          700: "#741C21",
          800: "#501419",
          900: "#2C0C10",
          950: "#20090C",
        },
        softPink: {
          50: "#FFF1F5",
          100: " #FFE0E7",
          200: "#FFC2D0",
          300: "#FFA3B9",
          400: "#FF85A2",
          500: "#FF668B",
          600: "#E65073",
          700: "#CC3A5B",
          800: "#B32443",
          900: "#99102C",
          950: "#590414",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sarabun: ["var(--font-sarabun)", "sarabun"],
        tajawal: ["var(--font-tajawal)", "tajawal"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
