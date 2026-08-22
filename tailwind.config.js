/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        term: {
          green: '#3ddc84',
          dim: '#8bd8b0',
        },
        panel: {
          DEFAULT: 'rgba(24, 28, 33, 0.72)',
          light: 'rgba(38, 43, 51, 0.65)',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        panel: '0 8px 32px rgba(0, 0, 0, 0.45)',
        window: '0 20px 60px rgba(0, 0, 0, 0.55)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
