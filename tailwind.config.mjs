import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/payload/**/*.{js,ts,jsx,tsx,mdx}', // Ensure Payload admin components are covered if customized
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
        // The Smatch "Industrial Luxury" Palette
        smatch: {
          black: '#050505', // The main background (Deepest void)
          charcoal: '#0F0F0F', // Secondary background (Sections)
          surface: '#1A1A1A', // Card backgrounds (Lighter than charcoal)
          border: '#333333', // Subtle borders
          gold: {
            DEFAULT: '#FFC800', // The primary accent (Vibrant Gold)
            dim: '#B8860B', // Darker gold for gradients/shadows
            light: '#FFE566', // Hover states or text highlights
            glow: 'rgba(255, 200, 0, 0.5)', // For box-shadows
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#A1A1AA', // Muted text for descriptions
            muted: '#52525B', // Very subtle text
          },
          white: {
            primary: '#FFFFFF',
            secondary: '#999999',
          },
        },
      },
      fontFamily: {
        // MAPPING THE FONTS:

        // Use 'font-heading' for Antonio
        heading: ['var(--font-antonio)', 'sans-serif'],

        // Use 'font-sans' for Inter (Default)
        sans: ['var(--font-inter)', 'sans-serif'],

        // Use 'font-mono' for JetBrains (Data)
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        // Custom gradients seen in your design
        'gold-gradient': 'linear-gradient(135deg, #FFC800 0%, #B8860B 100%)',
        'metal-sheen':
          'linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
        'fade-to-black': 'linear-gradient(to bottom, transparent 0%, #050505 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 200, 0, 0.1)',
        'glow-md': '0 0 20px rgba(255, 200, 0, 0.2)',
        'glow-lg': '0 0 30px rgba(255, 200, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(500px)' },
        },
        spotlight: {
          '0%': {
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
}

export default config
