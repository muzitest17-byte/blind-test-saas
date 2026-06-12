/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'bounce-custom': 'bounceCustom 0.6s cubic-bezier(0.36,0.07,0.19,0.97)',
      },
      keyframes: {
        glow: {
          '0%,100%': { boxShadow: '0 0 10px #a855f7, 0 0 20px #a855f7' },
          '50%': { boxShadow: '0 0 25px #a855f7, 0 0 50px #a855f7, 0 0 75px #a855f7' },
        },
        bounceCustom: {
          '0%,100%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-15px)' },
          '40%': { transform: 'translateY(-8px)' },
          '60%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
};
