import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        green: {
          // custom: '#6A983C',
          // light: '#F4F8EC',
          // 'light-100': '#C8DEB3',
          'dark-1': '#6A983C',
          'light-2': '#F4F8EC',
          'light-1': '#C8DEB3',
          'dark-2': '#46760A',
          'dark-3': '#92C064',
        },
        secondary: '#4a4a4a',
        accent: '#ff0000',
      },
    },
  },
  plugins: [],
};
export default config;
