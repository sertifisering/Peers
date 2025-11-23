import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
        { find: "@api", replacement: path.resolve(__dirname, "src/api") },
        { find: "@components", replacement: path.resolve(__dirname, "src/components") },
        { find: "@layouts", replacement: path.resolve(__dirname, "src/layouts") },
        { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
        { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
        { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") }
      ]
    }
})
