import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  
    Components({
      // relative paths to the directory to search for components.
      dirs: ['src/components'],
    
      // valid file extensions for components.
      extensions: ['vue'],
      // search for subdirectories
      deep: true,
      // resolvers for custom components
      resolvers: [],
    
      // generate `components.d.ts` global declarations,
      // also accepts a path for custom filename
      // default: `true` if package typescript is installed
      dts: false,
    
      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: false,
      // Subdirectory paths for ignoring namespace prefixes
      // works when `directoryAsNamespace: true`
      globalNamespaces: [],
    
      // auto import for directives
      // default: `true` for Vue 3, `false` for Vue 2
      // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
      // To install Babel, run: `npm install -D @babel/parser`
      directives: true,
    
      // Transform path before resolving
      importPathTransform: v => v,
    
      // Allow for components to override other components with the same name
      allowOverrides: false,
    
      // filters for transforming targets
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    
    }),
  ]

})
