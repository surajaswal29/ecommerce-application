import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Enable SWC minification
      jsxImportSource: '@emotion/react',
    }),
  ],

  // Base URL for the application
  base: '/',

  // Development server configuration
  server: {
    port: 3000,
    host: true, // Allow external connections
    open: true, // Open browser automatically
    cors: true, // Enable CORS
    proxy: {
      // Proxy API requests to backend
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
    // Enable HTTPS in development (optional)
    // https: {
    //   key: './certs/localhost-key.pem',
    //   cert: './certs/localhost.pem',
    // },
  },

  // Preview server configuration (for production preview)
  preview: {
    port: 3000,
    host: true,
    open: true,
  },

  // Build configuration
  build: {
    // Output directory
    outDir: 'dist',
    // Remove console logs in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Generate source maps for production debugging
    sourcemap: false,
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Rollup options
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          icons: ['react-icons'],
          utils: ['axios', 'swiper'],
          // Feature-based chunks
          auth: [
            './src/hooks/use-auth.js',
            './src/store/slices/authSlice.js',
          ],
          data: [
            './src/hooks/use-data.js',
            './src/store/slices/dataSlice.js',
          ],
          components: [
            './src/components/layout/header',
            './src/components/layout/footer',
            './src/components/layout/product',
            './src/components/layout/cart',
          ],
        },
        // Asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Target browsers
    target: 'es2015',
    // CSS code splitting
    cssCodeSplit: true,
  },

  // CSS configuration
  css: {
    // CSS modules configuration
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    // PostCSS configuration
    postcss: {
      plugins: [
        // Add autoprefixer for better browser compatibility
        require('autoprefixer')({
          overrideBrowserslist: [
            '> 1%',
            'last 2 versions',
            'not dead',
            'not ie 11',
          ],
        }),
      ],
    },
    // CSS preprocessor options
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
  },

  // Resolve configuration
  resolve: {
    // Alias configuration for cleaner imports
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@service': path.resolve(__dirname, './src/service'),
    },
    // File extensions to resolve
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
  },

  // Environment variables
  define: {
    // Define global constants
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },

  // Dependency optimization
  optimizeDeps: {
    // Pre-bundle these dependencies
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'axios',
      'swiper',
      'react-icons',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
    ],
    // Exclude these from pre-bundling
    exclude: ['@vite/client', '@vite/env'],
  },

  // Log level
  logLevel: 'info',

  // Clear screen on restart
  clearScreen: false,

  // Environment mode
  mode: process.env.NODE_ENV || 'development',

  // Public directory
  publicDir: 'public',

  // Cache directory
  cacheDir: 'node_modules/.vite',

  // Experimental features
  experimental: {
    // Enable renderBuiltUrl for custom asset URLs
    renderBuiltUrl: (filename, { hostType }) => {
      if (hostType === 'js') {
        return { js: `/${filename}` };
      } else {
        return { relative: true };
      }
    },
  },

  // Worker configuration
  worker: {
    format: 'es',
  },

  // JSON configuration
  json: {
    namedExports: true,
    stringify: false,
  },

  // Assets handling
  assetsInclude: [
    '**/*.glb',
    '**/*.gltf',
    '**/*.mp4',
    '**/*.webm',
    '**/*.ogg',
    '**/*.mp3',
    '**/*.wav',
    '**/*.flac',
    '**/*.aac',
  ],

  // ESM configuration
  esbuild: {
    // Target ES version
    target: 'es2015',
    // JSX configuration
    jsx: 'automatic',
    // Minify configuration
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
});
