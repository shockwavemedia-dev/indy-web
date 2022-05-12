module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './constants/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        1.5: '1.5px',
        3: '3px',
      },
      gridTemplateRows: {
        10: 'repeat(10, minmax(0, 1fr))',
        12: 'repeat(12, minmax(0, 1fr))',
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
        23: 'repeat(23, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-14': 'span 14 / span 14',
      },
      padding: {
        2.5: '.625rem',
        3.5: '.875rem',
        4.5: '1.125rem',
        7.5: '1.875rem',
        9.5: '2.375rem',
        13: '3.25rem',
        15: '3.75rem',
        22: '5.5rem',
      },
      margin: {
        2.5: '.625rem',
        4.5: '1.125rem',
        7: '1.75rem',
        14.5: '3.625rem',
        15: '3.75rem',
        15.5: '3.875rem',
      },
      fontSize: {
        tiny: ['.375rem', '.45rem'],
        xxs: ['.625rem', '.75rem'],
        xxl: ['1.375rem', '1.875rem'],
        '2.5xl': ['1.75rem', '2.125rem'],
      },
      width: {
        9.5: '2.375rem',
        75: '18.75rem',
        78: '19.5rem',
        103: '25.75rem',
        130: '32.5rem',
        140: '35rem',
        142.5: '35.625rem',
        147: '36.75rem',
        163: '40.75rem',
        175: '43.75rem',
        212.5: '53.125rem',
        270: '67.5rem',
      },
      height: {
        0.25: '0.0625rem',
        0.75: '0.1875rem',
        1.5: '.375rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
        11.5: '2.875rem',
        12.5: '3.125rem',
        18.5: '4.625rem',
        30: '7.5rem',
        35: '8.75rem',
        108.5: '27.125rem',
        155: '38.75rem',
        262.5: '65.625rem',
      },
      inset: {
        0.5: '.125rem',
        0.752: '0.188rem',
      },
      minWidth: {
        4: '1rem',
        9.5: '2.375rem',
        10: '2.5rem',
        11: '2.75rem',
        11.5: '2.875rem',
        25: '6.25rem',
        75: '18.75rem',
        86: '21.5rem',
      },
      minHeight: {
        4: '1rem',
        5: '1.25rem',
        9.5: '2.375rem',
        10: '2.5rem',
        11: '2.75rem',
        11.5: '2.875rem',
        12.5: '3.125rem',
        35: '8.75rem',
        102: '25.5rem',
        155: '38.75rem',
      },
      maxHeight: {
        75: '18.75rem',
      },
      maxWidth: {
        75: '18.75rem',
        86: '21.5rem',
        228: '57rem',
      },
      spacing: {
        0.5: '0.125rem',
        1.5: '.375rem',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
    },
    backgroundImage: {
      auth: "url('/images/auth-bg.png')",
    },
    boxShadow: {
      DEFAULT: '0px 4px 10px #2a2a3408',
      'react-select': '0 0 0 1px #0000001a, 0 4px 11px #0000001a',
    },
    fontFamily: {
      urbanist: ['Urbanist'],
      'varela-round': ['Varela Round'],
    },
    colors: {
      transparent: 'transparent',
      pattensblue: '#DEEBFF',
      onyx: '#32343D',
      white: '#FFFFFF',
      waterloo: '#7C7C8D',
      honeydew: '#E9FAF3',
      linen: '#FFF0E9',
      magnolia: '#F9EFFF',
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
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
