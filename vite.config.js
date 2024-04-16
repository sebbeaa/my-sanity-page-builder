<<<<<<< HEAD
import worker from 'vite-plugin-worker'

export default {
  plugins: [worker()],
}
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
>>>>>>> f8ed1ff (removed unused deps)
