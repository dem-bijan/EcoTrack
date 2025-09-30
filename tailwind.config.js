import textshadow from 'tailwindcss-textshadow';

const tailwindConfig = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        signature: ['Signature', 'cursive'],
      },
    },
  },
  plugins: [textshadow],
};

export default tailwindConfig;
