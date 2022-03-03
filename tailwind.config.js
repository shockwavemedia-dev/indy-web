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
      raisinblack: '#1F2024',
      darksilver: '#6B6E75',
      davysgrey: '#545454',
      ererieblack: '#1F1F1F',
      darkgunmetal: '#1D212B',
      philippinegrey: '#8F8F8F',
      transparent: 'transparent',
      onyx: '#33353C',
      brightgray: '#ECECEC',
      kucrimson: '#E40808',
      schoolbusyellow: '#FFD800',
      yellowgreen: '#2CB117',
    },
    content: {
      checkbox: 'url("/icons/checkbox.svg")',
      'checkbox-checked': 'url("/icons/checkbox-checked.svg")',
    },
  },
  plugins: [],
}
