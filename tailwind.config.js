module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: { extend: {} },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
