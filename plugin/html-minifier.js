const { minify } = require('html-minifier-terser')
module.exports = function () {
  return {
    name: 'vite-plugin-html-minifier',
    apply: 'build',
    enforce: 'post',
    async generateBundle(_options, outBundle) {
      try {
        for (const bundle of Object.values(outBundle)) {
          if (bundle.type === 'asset' && /\.html$/i.test(bundle.fileName)) {
            bundle.source = await minify(bundle.source, {
              removeAttributeQuotes: true,
              collapseWhitespace: true,
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
  }
}
