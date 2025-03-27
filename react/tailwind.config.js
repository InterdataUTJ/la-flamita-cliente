/** @type {import('tailwindcss').Config} */
import { content, plugin } from 'flowbite-react/tailwind'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
        },
        tertiary: {
          100: 'var(--color-tertiary-100)',
          200: 'var(--color-tertiary-200)',
          300: 'var(--color-tertiary-300)',
          400: 'var(--color-tertiary-400)',
          500: 'var(--color-tertiary-500)',
          600: 'var(--color-tertiary-600)',
          700: 'var(--color-tertiary-700)',
          800: 'var(--color-tertiary-800)',
          900: 'var(--color-tertiary-900)',
        },
        quaternary: {
          100: 'var(--color-quaternary-100)',
          200: 'var(--color-quaternary-200)',
          300: 'var(--color-quaternary-300)',
          400: 'var(--color-quaternary-400)',
          500: 'var(--color-quaternary-500)',
          600: 'var(--color-quaternary-600)',
          700: 'var(--color-quaternary-700)',
          800: 'var(--color-quaternary-800)',
          900: 'var(--color-quaternary-900)',
        },
        quinary: {
          100: 'var(--color-quinary-100)',
          200: 'var(--color-quinary-200)',
          300: 'var(--color-quinary-300)',
          400: 'var(--color-quinary-400)',
          500: 'var(--color-quinary-500)',
          600: 'var(--color-quinary-600)',
          700: 'var(--color-quinary-700)',
          800: 'var(--color-quinary-800)',
          900: 'var(--color-quinary-900)',
        },
      }
    },
  },
  plugins: [plugin()],
  safelist: [{
    pattern: /(bg|text|border)-(primary|secondary|tertiary|quaternary|quinary)-(1|2|3|4|5|6|7|8|9)00/,
    variants: ['lg', 'hover', 'focus', 'lg:hover', 'lg:focus', 'focus-within', 'focus-visible', 'active', 'disabled'],
  }]
}

