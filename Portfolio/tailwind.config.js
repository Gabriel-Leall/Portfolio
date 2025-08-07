/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores do tema claro
        'background-light': '#f8ede9',
        'primary-light': '#caa27e',
        'text-strong-light': '#0d0d0f',
        'text-muted-light': '#5e7381',
        'support-neutral-light': '#b88c64',
        'surface-soft-light': '#f6f0eb',

        // Cores do tema escuro
        'background-dark': '#272727',
        'accent-dark': '#021a1a',
        'text-strong-dark': '#f6f0eb',
        'text-muted-dark': '#dcd0a8',
        'primary-dark': '#2cc295',
        'support-neutral-dark': '#626262',
        'surface-soft-dark': '#3a3a3a',

        // Cores semânticas que se adaptam ao tema
        background: 'var(--background)',
        primary: 'var(--primary)',
        'text-strong': 'var(--text-strong)',
        'text-muted': 'var(--text-muted)',
        'support-neutral': 'var(--support-neutral)',
        'surface-soft': 'var(--surface-soft)',
        accent: 'var(--accent)',

        // Cores do sistema de design
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        mono: [
          'source-code-pro',
          'Menlo',
          'Monaco',
          'Consolas',
          'Courier New',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}
