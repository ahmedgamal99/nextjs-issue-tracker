/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {} // This ensures that vendor prefixes are added to your CSS.
  }
};

export default config;
