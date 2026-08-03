import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        suntech: {
          emerald: {
            400: '#34D399',
            500: '#10B981',
            600: '#059669',
            700: '#047857',
            900: '#064E3B',
          },
          blue: {
            500: '#3B82F6',
            600: '#2563EB',
            800: '#1E3A8A',
            900: '#0F172A',
            950: '#0B1329',
          },
          gold: {
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
          },
          dark: {
            800: '#1E293B',
            900: '#0F172A',
            950: '#090D16',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top, #0F172A 0%, #090D16 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'gold-emerald-gradient': 'linear-gradient(90deg, #10B981 0%, #F59E0B 100%)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
