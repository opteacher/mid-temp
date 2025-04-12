import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { URL, fileURLToPath } from 'node:url'
import project from './src/jsons/project.json'
import { writeFileSync, readFileSync } from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default ({ mode }: any) =>
  defineConfig({
    base: `/${project.middle.prefix || project.name}`,
    plugins: [
      vue(),
      {
        name: 'generate-environments',
        enforce: 'pre',
        writeBundle() {
          writeFileSync(path.resolve(__dirname, '.env'), `VITE_PJT=${project.name}`)
        }
      },
      {
        name: 'change-html-title',
        writeBundle() {
          const htmlPath = path.resolve(__dirname, 'dist', 'index.html')
          const htmlContent = readFileSync(htmlPath).toString()
          writeFileSync(
            htmlPath,
            htmlContent.replace('<!--return project.nickName-->', project.nickName)
          )
        }
      }
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@lib': fileURLToPath(new URL('./src/lib/src', import.meta.url))
      }
    },
    define: {
      'process.env': loadEnv(mode, process.cwd())
    }
  })
