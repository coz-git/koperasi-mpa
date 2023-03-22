/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms')({ strategy: 'class' }),
    require('flowbite/plugin'),
  ],
};
