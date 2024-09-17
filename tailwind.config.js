/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        ball: "ballAppear 0.8s ease-out",
      },
      keyframes: {
        ballAppear: {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(360deg)", opacity: "1" },
        },
      },
      fontFamily: {
        sans: ["Roboto Condensed", "sans-serif"], // 'sans' es el valor predeterminado para Tailwind
        protestGuerrilla: ["Protest Guerrilla", "sans-serif"],
        sofadiOne: ["Sofadi One", "system-ui", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        robotoCondensed: ["Roboto Condensed", "sans-serif"],
      },
      fontSize: {
        "2xs": ".625rem", // 10px
        "3xs": ".5rem", // 8px
      },
    },
  },
  plugins: [],
};
