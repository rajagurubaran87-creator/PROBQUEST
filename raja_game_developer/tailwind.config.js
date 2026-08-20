/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quest: {
          dark: '#0a0d18',
          card: 'rgba(18, 24, 43, 0.75)',
          border: 'rgba(79, 110, 247, 0.25)',
          primary: '#6366f1',
          accent: '#06b6d4',
          neon: '#10b981',
          gold: '#f59e0b',
          purple: '#8b5cf6',
          pink: '#ec4899',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px rgba(99, 102, 241, 0.35)',
        'glow-accent': '0 0 25px rgba(6, 182, 212, 0.35)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.45)',
        'glow-neon': '0 0 25px rgba(16, 185, 129, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(99, 102, 241, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
