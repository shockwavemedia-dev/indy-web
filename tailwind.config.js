module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
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
      ebonyclay: '#8F8F8F',
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
    },
    content: {
      checkbox: 'url("/icons/checkbox.svg")',
      'checkbox-checked': 'url("/icons/checkbox-checked.svg")',
    },
  },
  plugins: [],
}
