const path = require('path')
const fs = require('fs')
let viteConfig = null
module.exports = function (comment) {
  return {
    name: 'vite-plugin-banner',
    apply: 'build',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },
    async writeBundle(options, bundle) {
      const root = viteConfig.root
      const outDir = viteConfig.build.outDir || 'dist'
      for (const file of Object.entries(bundle)) {
        const fileName = file[0]
        const filePath = path.resolve(root, outDir, fileName)
        if (/\.(css|js)$/i.test(fileName) && !/vendor/.test(fileName)) {
          try {
            let data = fs.readFileSync(filePath, {
              encoding: 'utf8',
            })
            if (comment.includes('/*') || comment.includes('*/')) {
              data = `${comment}\n${data}`
            } else {
              data = `/*! ${comment} */\n${data}`
            }
            fs.writeFileSync(filePath, data)
          } catch (e) {
            console.log(e)
          }
        }
      }
    },
  }
}
