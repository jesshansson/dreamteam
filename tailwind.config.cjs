/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Låt Vite se Tailwind-klasser i index.html
    "./src/**/*.{js,ts,jsx,tsx}", // Låt Vite se Tailwind-klasser i alla React-filer
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#0a2857",
      },
      fontFamily: {
        cursive: ['"Playpen Sans"', "cursive"],
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite", // Lägg till shimmer-animationen
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
