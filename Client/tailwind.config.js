/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      backgroundImage: {
        'bot-asset': "url('/bg.png')",
      },
      colors: {
        'primary': "#0e0c16",
        'secondary': "#12101b"
      }
    },
  },
  plugins: [],
}