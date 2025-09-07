import textshadow from 'tailwindcss-textshadow';

export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textShadow: {
        'outline': '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
      }
    },
  },
  plugins: [textshadow],
};