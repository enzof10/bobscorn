import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = `${process.env.VITE_APP_PORT_URL ?? '3000'}`;
// https://vite.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    preview: {
        port: PORT,
        strictPort: true,
    },
    server: {
        port: PORT,
        host: true,
        watch: {
            usePolling: true,
            interval: 100,   
          }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
