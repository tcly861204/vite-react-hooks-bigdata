const path = require('path')
const fs = require('fs')
let viteConfig = null
module.exports = function (comment) {
  return {
    name: 'vite-plugin-copy',
    apply: 'build',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },
    async writeBundle() {
      const root = viteConfig.root
      const outDir = viteConfig.build.outDir || 'dist'
      const dir = fs.readdirSync(path.resolve(root, 'public'))
      const distDir = path.resolve(outDir, 'public')
      try {
        fs.statSync(distDir)
      } catch (_) {
        fs.mkdirSync(distDir)
      }
      dir.forEach((file) => {
        const filePath = path.resolve(root, 'public', file)
        fs.stat(filePath, (_, stat) => {
          if (stat.isFile()) {
            // 创建读取流
            const readStream = fs.createReadStream(filePath)
            // 创建写入流
            const writeStream = fs.createWriteStream(
              path.resolve(distDir, file)
            )
            // 复制写入文件
            readStream.pipe(writeStream)
          }
        })
      })
    },
  }
}
