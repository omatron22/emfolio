/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class", '[data-theme="dark"]'],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          accent: "var(--accent)",
          "accent-foreground": "var(--accent-foreground)",
          muted: "var(--muted)",
          "muted-foreground": "var(--muted-foreground)",
        },
        typography: {
          DEFAULT: {
            css: {
              maxWidth: '100ch',
              color: 'var(--foreground)',
              h1: {
                fontWeight: '800',
                color: 'var(--foreground)',
              },
              h2: {
                fontWeight: '700',
                color: 'var(--foreground)',
              },
              h3: {
                fontWeight: '600',
                color: 'var(--foreground)',
              },
              a: {
                color: 'var(--accent)',
                '&:hover': {
                  color: 'var(--accent)',
                },
              },
              blockquote: {
                borderLeftColor: 'var(--accent)',
              },
            },
          },
        },
        fontFamily: {
          sans: ["var(--font-geist-sans)"],
          mono: ["var(--font-geist-mono)"],
          playfair: ["var(--font-playfair)"],
          oswald: ["var(--font-oswald)"],
          poppins: ["var(--font-poppins)"],
        },
        keyframes: {
          "fade-in": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
          "fade-out": {
            "0%": { opacity: 1 },
            "100%": { opacity: 0 },
          },
          "slide-up": {
            "0%": { transform: "translateY(10px)", opacity: 0 },
            "100%": { transform: "translateY(0)", opacity: 1 },
          },
          "slide-down": {
            "0%": { transform: "translateY(-10px)", opacity: 0 },
            "100%": { transform: "translateY(0)", opacity: 1 },
          },
        },
        animation: {
          "fade-in": "fade-in 0.3s ease-in-out",
          "fade-out": "fade-out 0.3s ease-in-out",
          "slide-up": "slide-up 0.3s ease-out",
          "slide-down": "slide-down 0.3s ease-out",
        },
      },
    },
    plugins: [],
  };