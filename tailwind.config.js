/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cores de fundo
        background: {
          primary: "#1a1a1a",
          secondary: "#2a2a2a",
          dark: "#0f0f0f",
        },
        // Cores de acento
        accent: {
          cyan: "#00d4ff",
          blue: "#00a8cc",
          light: "#33e0ff",
          dark: "#0088aa",
        },
        // Cores de texto
        text: {
          primary: "#ffffff",
          secondary: "#b0b0b0",
          muted: "#808080",
        },
        // Cores de borda
        border: {
          primary: "#333333",
          accent: "#00d4ff",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      blur: {
        xs: "2px",
        "4xl": "120px",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
};
