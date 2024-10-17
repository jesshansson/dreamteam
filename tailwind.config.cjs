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
    },
  },
  plugins: [],
};
