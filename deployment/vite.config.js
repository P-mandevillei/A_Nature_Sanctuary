import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Resolve absolute path to project root
const certPath = path.resolve(__dirname, 'ssl/cert.pem')
const keyPath = path.resolve(__dirname, 'ssl/key.pem')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    }
  }
})