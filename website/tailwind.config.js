/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    // Keep utility classes defined inside the DayFlow package
    'flex-2',
    'max-w-[400px]',
  ],
  theme: {
 
  },
  plugins: [],
};
