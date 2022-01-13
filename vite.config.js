import path from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import viteCompression from 'vite-plugin-compression'
import vitePluginImp from 'vite-plugin-imp'
import visualizer from 'rollup-plugin-visualizer'
import htmlMinifier from './plugin/html-minifier'
import banner from './plugin/banner'
import copyPlugin from 'vite-plugin-files-copy'
const env = process.argv[process.argv.length - 1]
const isProd = env === 'production'
// https://vitejs.dev/config/
export default defineConfig({
  base: isProd ? '/vite-react-hooks-bigdata/' : '/',
  /**
   * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
   * @default 'dist'
   */
  publicDir: 'dist',
  mode: 'development',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 配置代理
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    // proxy: {
    //   '/api': {
    //     target: 'localhost:4000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    reactRefresh(),
    // 复制文件
    copyPlugin({
      patterns: [
        {
          from: './public',
          to: './dist',
        },
      ],
    }),
    // 压缩编译后的html
    htmlMinifier(),
    // 给打包的代码加上信息
    banner(`
  author: tcly861204
  email: tcly861204@hotmail.com
  date: ${new Date().toLocaleString()}
  gitee: https://gitee.com/tcly861204/vite-react-cnode
`),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    isProd &&
      viteCompression({
        // 压缩
        ext: '.br',
        verbose: false,
        threshold: 10 * 1024,
        filter: /\.(js|mjs|json|css)$/i,
        algorithm: 'brotliCompress',
      }),
    isProd &&
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: 'dist/report.html',
      }),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: false,
    manifest: true,
    brotliSize: true, // 是否启用 brotli 压缩，IE 不支持
    chunkSizeWarningLimit: 300, // chunk 超大警告显示
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
