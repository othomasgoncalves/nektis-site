import type { Config } from "tailwindcss";

// Tokens exatos do brandbook Nektis — não adicionar variações fora desta paleta.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./emails/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roxo: "#3e1c59",
        lilas: "#a68eee",
        lavanda: "#efe5fe",
        offwhite: "#efebe8",
      },
      fontFamily: {
        display: ["var(--font-unbounded)"],
        body: ["var(--font-satoshi)"],
      },
    },
  },
  plugins: [],
};

export default config;
