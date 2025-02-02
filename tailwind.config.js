/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#FDFBF7',
          100: '#F9F6F0',
          200: '#F3EDE2',
          300: '#E8DCC8',
          400: '#D4C3A9',
          500: '#C1A98B',
          600: '#A68B6C',
          700: '#8C7357',
          800: '#735D45',
          900: '#5A4735',
          1000: '#42332A',
        },
        matteBlue: {
          50: '#F4F7FA',
          100: '#E3ECF5',
          200: '#C7D9EB',
          300: '#A4BCD6',
          400: '#7A9CBB',
          500: '#5A7DA0',
          600: '#4A6680',
          700: '#3B5064',
          800: '#2D3C4A',
          900: '#202A34',
          1000: '#161D24',
        },
        matteGreen: {
          50: '#F4FAF6',
          100: '#DFF3E8',
          200: '#BFE7D0',
          300: '#96D4AF',
          400: '#6CBC8C',
          500: '#4D9C70',
          600: '#3E805A',
          700: '#2F6245',
          800: '#214832',
          900: '#172E22',
          1000: '#0E1D15',
        },
        matteOrange: {
          50: '#FFF9F4',
          100: '#FFEDDC',
          200: '#FFD7B6',
          300: '#FFBB88',
          400: '#FF9A5A',
          500: '#DB7A41',
          600: '#B76136',
          700: '#914B2B',
          800: '#6C3721',
          900: '#482414',
          1000: '#2F180E',
        },
        mattePurple: {
          50: '#F7F4FA',
          100: '#E9E2F2',
          200: '#D0C2E5',
          300: '#B49AD2',
          400: '#9471B8',
          500: '#7A549A',
          600: '#62427E',
          700: '#4D3362',
          800: '#392548',
          900: '#281A32',
          1000: '#1A1020',
        },
        matteRed: {
          50: '#FAF4F4',
          100: '#F5E3E3',
          200: '#EBC7C7',
          300: '#D6A4A4',
          400: '#BB7A7A',
          500: '#A05A5A',
          600: '#804A4A',
          700: '#643B3B',
          800: '#4A2D2D',
          900: '#342020',
          1000: '#241616',
        },
        matteYellow: {
          50: '#FAFAF4',
          100: '#F5F3E3',
          200: '#EBE3C7',
          300: '#D6CBA4',
          400: '#BBAC7A',
          500: '#A08E5A',
          600: '#80734A',
          700: '#645B3B',
          800: '#4A4430',
          900: '#342F20',
          1000: '#241F16',
        },
        matteTeal: {
          50: '#F4FAFA',
          100: '#E3F5F5',
          200: '#C7EBEB',
          300: '#A4D6D6',
          400: '#7ABBBB',
          500: '#5AA0A0',
          600: '#4A8080',
          700: '#3B6464',
          800: '#2D4A4A',
          900: '#203434',
          1000: '#162424',
        },
        mattePink: {
          50: '#FAF4F7',
          100: '#F5E3EC',
          200: '#EBC7D9',
          300: '#D6A4BC',
          400: '#BB7A9A',
          500: '#A05A7A',
          600: '#804A61',
          700: '#643B4D',
          800: '#4A2D39',
          900: '#34202A',
          1000: '#24161D',
        },
      },
    },
  },
  plugins: [],
};
