module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-preset-env')(),
    require('autoprefixer')({
      remove: false,
      browsers: ['iOS >= 7', 'android >= 4.4'],
    }),
  ],
}
