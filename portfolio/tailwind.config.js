/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cores principais do portfólio
        primary: {
          DEFAULT: "#00d4ff", // Cyan brilhante
          hover: "#00a8cc", // Cyan mais escuro para hover
          glow: "#00d4ff", // Cor para efeitos de brilho
        },
        secondary: {
          DEFAULT: "#9D4EDD", // Roxo
          hover: "#7b2cbf", // Roxo mais escuro
        },
        accent: {
          DEFAULT: "#FFA500", // Laranja
          hover: "#ff8c00", // Laranja mais escuro
        },
        background: {
          DEFAULT: "#1a1a1a", // Fundo principal escuro
          dark: "#0a0a0a", // Fundo mais escuro
          light: "#2a2a2a", // Fundo mais claro
          card: "#1f1f1f", // Fundo para cards
        },
        text: {
          primary: "#ffffff", // Texto principal branco
          secondary: "#b0b0b0", // Texto secundário cinza claro
          muted: "#6b6b6b", // Texto desbotado
        },
        border: {
          DEFAULT: "#333333", // Borda padrão
          light: "#444444", // Borda clara
          glow: "#00d4ff", // Borda com brilho
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(0, 212, 255, 0.5)",
        "glow-primary-lg": "0 0 40px rgba(0, 212, 255, 0.6)",
        "glow-secondary": "0 0 20px rgba(157, 78, 221, 0.5)",
        "glow-accent": "0 0 20px rgba(255, 165, 0, 0.5)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
