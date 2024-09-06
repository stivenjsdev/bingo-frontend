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
    },
  },
  plugins: [],
};
