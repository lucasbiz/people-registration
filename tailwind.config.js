import PrimeUI from "tailwindcss-primeui";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/primeng/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [PrimeUI],
};
