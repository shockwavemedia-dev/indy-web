module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        14: 'repeat(14, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-9': 'span 9 / span 9',
        'span-11': 'span 11 / span 11',
      },
    },
    fontFamily: {
      inter: ['Inter'],
    },
    colors: {
      white: '#FFFFFF',
      shark: '#1F2024',
      nevada: '#6B6E75',
      emperor: '#545454',
      mineshaft: '#1F1F1F',
      ebonyclay: '#1D212B',
      transparent: 'transparent',
      gallery: '#ECECEC',
      red: '#E40808',
      schoolbusyellow: '#FFD800',
      lapalma: '#2CB117',
      codgray: '#1F1F1F',
      woodsmoke: '#0F0F11',
      santasgray: '#A0A2AD',
      abbey: '#484A54',
      stormgray: '#717583',
      frenchgray: '#B8BAC2',
      manatee: '#888B99',
      wildsand: '#F5F5F5',
      black: '#000000',
      iron: '#CFD1D6',
      athensgray: '#E7E8EB',
      tuna: '#33353C',
    },
    content: {
      checkbox: 'url("/icons/checkbox.svg")',
      'checkbox-checked': 'url("/icons/checkbox-checked.svg")',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
