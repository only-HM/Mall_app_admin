module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  lintOnSave: false,
};
