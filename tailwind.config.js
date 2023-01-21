const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['helvetica,arial,verdana,sans-serif', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'primary-gray': '#2D2D2D',
        'soft-gray': '#F4FBF2',
        'primary-green': '#65CC46',
        'primary-blue': '#3788d7',
        'secondary-blue': '#2f74b8',
        'primary-red': '#CA2929',
        'secondary-red': '#FFE3E3'
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
}
