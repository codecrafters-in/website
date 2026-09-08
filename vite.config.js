import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import path from 'path'
import { redirectPaths } from './src/data/redirects.js'
import { writeSitemap } from './scripts/sitemap.mjs'

export default defineConfig(({ isSsrBuild }) => ({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [
    react(),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
    compression({ algorithm: 'gzip', ext: '.gz' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: isSsrBuild ? undefined : {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          // three / @react-three are deliberately NOT listed here. Naming them as
          // manual chunks promotes them out of the async graph, which makes Vite
          // emit <link rel="modulepreload"> for them on every prerendered route —
          // ~215KB brotli on pages that never mount a <Canvas>. Left unnamed they
          // stay as async chunks behind the React.lazy boundaries in
          // HeroCanvas.jsx / ForgeCore.jsx and load only where actually used.
          gsap: ['gsap', '@gsap/react'],
          lenis: ['lenis'],
        },
      },
    },
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 900,
  },
  ssgOptions: {
    dirStyle: 'flat',
    script: 'defer',
    formatting: 'none',
    includedRoutes: (paths) => {
      const skip = new Set(redirectPaths.map((p) => p.replace(/^\//, '')))
      return paths.filter((p) => !skip.has(String(p).replace(/^\//, '')))
    },
    onFinished: async (dir) => {
      await writeSitemap(dir || path.resolve(__dirname, 'dist'))
    },
  },
}))
