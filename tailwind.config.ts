import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#0B0B0F",
        ember: "#0F172A",
        electric: "#1D4ED8",
        cyanflare: "#22D3EE",
        warning: "#F59E0B"
      },
      boxShadow: {
        neon: "0 0 40px rgba(34, 211, 238, 0.25)",
        panel: "0 24px 80px rgba(2, 6, 23, 0.55)"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at 30% 20%, rgba(29, 78, 216, 0.28), transparent 50%), radial-gradient(circle at 80% 0%, rgba(34, 211, 238, 0.22), transparent 45%), linear-gradient(160deg, #06070D 0%, #0B0B0F 55%, #06070D 100%)"
      }
    }
  },
  plugins: []
};

export default config;