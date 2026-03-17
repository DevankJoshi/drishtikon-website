import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'NouvelleGrotesquerie'", 'Arial', 'Helvetica', 'sans-serif'],
        inter: ["'NouvelleGrotesquerie'", 'Arial', 'Helvetica', 'sans-serif'],
        anton: ["'NouvelleGrotesquerie'", 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        'brand-orange': '#d28723',
        'brand-blue': '#0055ff',
        'brand-dark': '#0a0a0a',
      },
    },
  },
  plugins: [],
};

export default config;
