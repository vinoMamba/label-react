import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({
                                 command,
                                 mode
                             }) => {
    const env = loadEnv(mode, process.cwd())
    return {
        server: {
            port: 3000,
            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },
        plugins: [
            Unocss(),
            react()],
    }
})
