/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#00ABE4',
        'white-blue': '#EBFBFC',
        'sky-blue': '#E8F1FA',
        'navy': '#38496B',
      },
    },
  },
  plugins: [],
}
