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
        // Core dark palette — extracted from the golden-maroon frame atmosphere
        "bg-deep":       "#0A0806",
        "bg-surface":    "#100D0A",
        "bg-raised":     "#1A1410",
        "bg-overlay":    "#241A12",

        // Sacred gold spectrum
        "gold-light":    "#F6C453",
        "gold-primary":  "#D4AF37",
        "gold-deep":     "#A8891A",
        "gold-dim":      "#6B5811",

        // Saffron & sacred red
        "saffron":       "#E07A00",
        "saffron-light": "#F0A040",
        "maroon":        "#8A1F11",
        "maroon-deep":   "#5A1209",

        // Text
        "ivory":         "#F8F6F1",
        "ivory-muted":   "#C8BFB0",
        "ivory-dim":     "#8A7F72",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jb-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Brutalist macro scale — temple display
        "display-2xl": ["clamp(3.5rem, 9vw, 10rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-xl":  ["clamp(2.5rem, 6vw, 6.5rem)",  { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        "display-lg":  ["clamp(2rem,   4.5vw, 5rem)",   { lineHeight: "1.0",  letterSpacing: "-0.02em" }],
        "display-md":  ["clamp(1.5rem, 3vw, 3.5rem)",   { lineHeight: "1.05", letterSpacing: "-0.015em" }],
      },
      spacing: {
        "nav":   "72px",
        "gutter": "clamp(1.5rem, 4vw, 4rem)",
      },
      backgroundImage: {
        "gradient-gold":    "linear-gradient(135deg, #D4AF37 0%, #E07A00 60%, #8A1F11 100%)",
        "gradient-divine":  "linear-gradient(180deg, rgba(212,175,55,0.0) 0%, rgba(212,175,55,0.15) 100%)",
        "gradient-vignette":"radial-gradient(ellipse at center, transparent 30%, rgba(10,8,6,0.85) 100%)",
        "gradient-overlay": "linear-gradient(to bottom, rgba(10,8,6,0) 0%, rgba(10,8,6,0.7) 60%, rgba(10,8,6,1) 100%)",
      },
      keyframes: {
        // Ambient golden shimmer
        "shimmer-gold": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "float-lamp": {
          "0%, 100%": { transform: "translateY(0px) rotate(-1deg)" },
          "50%":       { transform: "translateY(-8px) rotate(1deg)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
          "75%": { opacity: "0.95" },
        },
        "particle-rise": {
          "0%":   { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-120px) scale(0)", opacity: "0" },
        },
      },
      animation: {
        "shimmer-gold": "shimmer-gold 3s ease-in-out infinite",
        "float-lamp":   "float-lamp 4s ease-in-out infinite",
        "marquee":      "marquee 30s linear infinite",
        "flicker":      "flicker 2.5s ease-in-out infinite",
        "particle-rise":"particle-rise 3s ease-out infinite",
      },
      boxShadow: {
        "gold-glow":     "0 0 20px rgba(212,175,55,0.25), 0 0 60px rgba(212,175,55,0.1)",
        "gold-glow-lg":  "0 0 40px rgba(212,175,55,0.35), 0 0 100px rgba(212,175,55,0.15)",
        "saffron-glow":  "0 0 20px rgba(224,122,0,0.3)",
        "inset-gold":    "inset 0 1px 0 rgba(212,175,55,0.15), inset 0 -1px 0 rgba(0,0,0,0.3)",
        "card-elevated": "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
        "card-hover":    "0 16px 48px rgba(0,0,0,0.6), 0 4px 16px rgba(212,175,55,0.1)",
      },
      borderRadius: {
        "card": "16px",
        "pill": "9999px",
        "sm":   "8px",
        "xs":   "4px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
