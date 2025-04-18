/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        "tetris-red": "rgba(255, 0, 0, 0.2)",
        "tetris-cyan": "rgba(0, 255, 255, 0.1)",
        "tetris-purple": "rgba(128, 0, 128, 0.1)",
        "tetris-orange": "rgba(255, 165, 0, 0.1)",
        "tetris-yellow": "rgba(255, 255, 0, 0.1)",
      },
      backgroundColor: {
        header: "rgba(0, 0, 0, 0.9)",
      },
    },
  },
  plugins: [],
};
