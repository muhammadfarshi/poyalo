/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        layover: {
          DEFAULT: '#1B3FFF',
          light: '#4D6BFF',
          dark: '#0E28B8'
        },
        jet: {
          DEFAULT: '#FF5722',
          light: '#FF7A50',
          dark: '#D83B0A'
        },
        comic: {
          gold: '#FBBF24',
          salmon: '#FFA07A',
          cream: '#FDFBF7',
          ink: '#111827',
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px #111827',
        'brutal-sm': '2px 2px 0px #111827',
        'brutal-lg': '6px 6px 0px #111827',
        'brutal-orange': '4px 4px 0px #FF5722',
        'brutal-blue': '4px 4px 0px #1B3FFF',
        'brutal-gold': '4px 4px 0px #FBBF24',
      },
      borderWidth: {
        '2.5': '2.5px',
        '3': '3px',
      },
      fontFamily: {
        comic: ['"Bangers"', '"Impact"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [],
}
