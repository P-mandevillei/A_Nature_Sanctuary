import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'

  return {
    plugins: [react()],
    server: isDev
      ? {
          https: {
            key: fs.readFileSync(path.resolve(__dirname, 'ssl/key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.pem')),
          },
        }
      : {},
  }
})