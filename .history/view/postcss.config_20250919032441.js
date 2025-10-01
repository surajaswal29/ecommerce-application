export default {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie 11',
      ],
    },
    // Add other PostCSS plugins as needed
    // 'postcss-preset-env': {},
    // 'cssnano': {},
  },
};
