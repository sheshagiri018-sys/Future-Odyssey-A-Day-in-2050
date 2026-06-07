/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue', 'cursive'],
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        cinzel: ['Cinzel', 'serif'],
      },
      colors: {
        void: '#000000',
        abyss: '#03070F',
        cosmos: '#060D1A',
        nebula: '#0A1628',
        electric: '#00B8FF',
        plasma: '#00FFFF',
        aurora: '#7B2FFF',
        nova: '#FF6B2B',
        gold: '#FFB800',
        stellar: '#C8E6FF',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'scan': 'scan 3s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
