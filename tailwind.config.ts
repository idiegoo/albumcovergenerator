import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      width: {
        a4: '210mm',
    },
    height: {
      a4: '297mm',
    },
    spacing: {
      'calc-100-plus-12': 'calc(100% + 12px)',
    },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        //sans: ['var(--font-inter)'],
        roboto: ['var(--font-roboto)'],
        mono: ["var(--font-roboto-mono)"],
      },
      colors: {
        'offwhite': {
          DEFAULT: '#F8F7DA',
          100: '#FFFFE8',
          200: '#FFFFE4',
          300: '#F8F7DA',
          400: '#F1EFD0',
          500: '#E3DFBB',
          600: '#D5CFA6',
          700: '#C2BC97',
          800: '#B0AB89',
          900: '#A09B7D',
        },
      },
    },
    keyframes: {
      animatedgradient: {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
    },
    backgroundSize: {
      '300%': '300%',
    },
    animation: {
      gradient: 'animatedgradient 6s ease infinite alternate',
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

export default config
