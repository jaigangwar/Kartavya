/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eaf2f8',
          100: '#d4e6f1',
          200: '#a9cce3',
          300: '#7fb3d5',
          400: '#5499c7',
          500: '#2980b9',
          600: '#1a5276',
          700: '#154360',
          800: '#0e2f44',
          900: '#071928',
          DEFAULT: '#1a5276',
        },
        accent: {
          DEFAULT: '#148f77',
          light: '#1abc9c',
          dark: '#0e6655',
        },
        success: {
          DEFAULT: '#27ae60',
          light: '#2ecc71',
        },
        warning: {
          DEFAULT: '#e67e22',
          light: '#f39c12',
        },
        danger: {
          DEFAULT: '#c0392b',
          light: '#e74c3c',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 12s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(41, 128, 185, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(41, 128, 185, 0.3)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        '3xl': '64px',
      },
    },
  },
  plugins: [],
};
