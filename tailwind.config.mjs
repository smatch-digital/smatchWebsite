import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}', // Blocks like Ecosystem, Team, etc.
    './src/Header/**/*.{js,ts,jsx,tsx,mdx}', // Header components
    './src/Footer/**/*.{js,ts,jsx,tsx,mdx}', // Footer components
    './src/payload/**/*.{js,ts,jsx,tsx,mdx}', // Payload admin components
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1600px',
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
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
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
            DEFAULT: '#FFAA00', // The primary accent (Smatch Gold)
            dim: '#B8860B', // Darker gold for gradients/shadows
            light: '#FFD966', // Hover states or text highlights
            glow: 'rgba(255, 170, 0, 0.5)', // For box-shadows
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
      // FLUID TYPOGRAPHY - Responsiveness Architect Pattern
      // Uses clamp() for smooth scaling between viewports
      fontSize: {
        'fluid-h1': 'clamp(2rem, 5vw + 1rem, 4rem)',      // 32px → 64px
        'fluid-h2': 'clamp(1.5rem, 4vw + 0.5rem, 3rem)',  // 24px → 48px
        'fluid-h3': 'clamp(1.25rem, 3vw + 0.5rem, 2rem)', // 20px → 32px
        'fluid-p': 'clamp(1rem, 1vw + 0.75rem, 1.125rem)', // 16px → 18px
        'fluid-sm': 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)', // 12px → 14px
      },
      // FLUID SPACING - Responsiveness Architect Pattern
      spacing: {
        'fluid-sm': 'clamp(0.5rem, 2vw, 1rem)',   // 8px → 16px
        'fluid-md': 'clamp(1rem, 4vw, 2rem)',     // 16px → 32px
        'fluid-lg': 'clamp(2rem, 6vw, 4rem)',     // 32px → 64px
        'fluid-xl': 'clamp(3rem, 8vw, 6rem)',     // 48px → 96px
      },
      backgroundImage: {
        // Custom gradients seen in your design
        'gold-gradient': 'linear-gradient(135deg, #FFAA00 0%, #B8860B 100%)',
        'metal-sheen':
          'linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
        'fade-to-black': 'linear-gradient(to bottom, transparent 0%, #050505 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 170, 0, 0.1)',
        'glow-md': '0 0 20px rgba(255, 170, 0, 0.2)',
        'glow-lg': '0 0 30px rgba(255, 170, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        scroll: 'scroll 60s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
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
