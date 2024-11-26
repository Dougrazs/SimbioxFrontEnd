import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lgBlue: "#009EDD",
        purpleBg: "#0F1330",
        simbioxGreen: "#21C565",
        gray: "#6D6E80",
        textColor: "#2F2E41",
        darkGray: "#999999"
      },
      width: {
        '81': '21rem',
        '100': '32rem'
      },
      height: {
        '25': "25rem"
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.drag-none': {
          '-webkit-user-drag': 'none',
          '-khtml-user-drag': 'none',
          '-moz-user-drag': 'none',
          '-o-user-drag': 'none',
          'user-drag': 'none',
        },
        '.transition-3s': {
          'transition-property': 'all',
          'transition-duration': '0.3s',
          'transition-timing-function': 'ease',
        },
        '.center-absolute': {
          'transform': 'translate(-50%, 0)',
          'left': '50%'
        }
      });
    }),
  ],
};

export default config;