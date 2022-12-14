/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './constants/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        black: '#000000',
        onyx: '#32343D',
        white: '#FFFFFF',
        waterloo: '#7C7C8D',
        honeydew: '#E9FAF3',
        linen: '#FFF0E9',
        magnolia: '#F9EFFF',
        navy: '#000080',
        orange: '#FFA500',
        orchid: '#DA70D6',
        quartz: '#4B494A',
        cultured: '#F9F9F7',
        'bright-gray': '#E8E8EF',
        'metallic-silver': '#ABABB9',
        'cosmic-latte': '#FFF6EA',
        'ghost-white': '#FAFAFC',
        'jungle-green': '#2BB67D',
        'lavender-gray': '#C5C5CC',
        'deep-saffron': '#F3A02E',
        'vivid-red-tangelo': '#D25C2A',
        'bleu-de-france': '#2F96EB',
        'alice-blue': '#E9F5FF',
        'purple-x11': '#A232E7',
        'tart-orange': '#FF4842',
        'mint-cream': '#F7FCFA',
        'carrot-orange': '#DA8A1C',
        'illuminating-emerald': '#219A68',
        'dark-pastel-red': '#BC4D1D',
        'bright-navy-blue': '#1F80D1',
        'dark-orchid': '#8823C6',
        'light-tart-orange': '#ffcecc',
        'light-deep-saffron': '#fce9cf',
        'red-crimson': '#DC143C',
        'golden-rod': '#DAA520',
        'forest-green': '#228B22',
        'light-red-crimson': '#fbd0d9',
        'light-golden-rod': '#f8eed3',
        'light-navy': '#ccccff',
        'light-forest-green': '#d6f5d6',
        'light-orange': '#ffedcc',
        'light-orchid': '#f5d6f4',
        'charleston-green': '#2B2D2C',
        'halloween-orange': '#F25D23',
        'deep-space-sparkle': '#446A73',
        'maximum-yellow-red': '#ECB54E',
        'white-coffee': '#E4DEDB',
        'deep-space-sparkle': '#456972',
        saffron: '#F6B22E',
        'dark-blue': '#009af4',
        'light-blue': '#8dd5ff',
        gray: '#a6a6a6',
      },
      zIndex: {
        60: '60',
      },
      borderWidth: {
        1.5: '1.5px',
        3: '3px',
      },
      fontSize: {
        tiny: ['.375rem', '.45rem'],
        xxs: ['.625rem', '.75rem'],
        xxl: ['1.375rem', '1.875rem'],
        '2.5xl': ['1.75rem', '2.125rem'],
      },
      maxWidth: {
        '8xl': '88rem',
        113: '28.25rem',
      },
      spacing: {
        0.75: '0.1875rem',
        2: '0.25rem',
        2.25: '0.5625rem',
        4.5: '1.125rem',
        8.5: '2.125rem',
        7.5: '1.875rem',
        9.5: '2.375rem',
        11.5: '2.875rem',
        12.5: '3.125rem',
        13: '3.25rem',
        14.5: '3.625rem',
        15.5: '3.875rem',
        15: '3.75rem',
        16.5: '4.125rem',
        17.5: '4.375rem',
        18.5: '4.625rem',
        20.5: '5.125rem',
        21.5: '5.375rem',
        22: '5.5rem',
        25: '6.25rem',
        30: '7.5rem',
        35: '8.75rem',
        40: '10rem',
        54: '13.5rem',
        62: '15.5rem',
        70: '17.5rem',
        74: '18.5rem',
        75: '18.75rem',
        78: '19.5rem',
        78.5: '19.625rem',
        86: '21.5rem',
        102: '25.5rem',
        103: '25.75rem',
        108.5: '27.125rem',
        130: '32.5rem',
        140: '35rem',
        142.5: '35.625rem',
        147: '36.75rem',
        155: '38.75rem',
        163: '40.75rem',
        175: '43.75rem',
        212.5: '53.125rem',
        228: '57rem',
        257.5: '64.375rem',
        260: '65rem',
        262.5: '65.625rem',
        270: '67.5rem',
        280: '70rem',
        320: '80rem',
        '1/6': '16.66%',
        '2/6': '33.33%',
        '3/6': '49.98%',
        '4/6': '66.64%',
        '5/6': '83.3%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/7': '14%',
        '2/7': '28%',
        '3/7': '42%',
        '4/7': '56%',
        '5/7': '70%',
        '6/7': '84%',
        '1/4': '25%',
        '2/5': '40%',
        '1/2': '50%',
        '3/5': '60%',
        '1/8': '12.5%',
        '2/8': '25%',
        '3/8': '37.5%',
        '4/8': '50%',
        '5/8': '62.5%',
        '6/8': '75%',
        '7/8': '87.5%',
      },
      boxShadow: {
        DEFAULT: '0px 4px 10px #2a2a3408',
      },
    },
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
      xs: { max: '474px' },
    },
    fontFamily: {
      urbanist: ['Urbanist'],
      'varela-round': ['Varela Round'],
      'circular-std': ['Circular Std'],
    },
    listStyleType: {
      square: 'square',
      roman: 'upper-roman',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      })
    }),
  ],
}
