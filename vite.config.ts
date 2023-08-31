import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import auto_import from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import path from 'path'

import {join} from 'path'
// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    auto_import({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',

    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,

    sourcemap: !!process.env.TAURI_DEBUG,
  },
}))
