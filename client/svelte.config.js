

import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const dev = process.argv.includes('dev');

const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    files: {
      assets: 'static' // This tells SvelteKit where to look for static assets.
    },
    // ... other kit options
  },

  // Vite options are at the top-level of the config object, not under `kit`.
  vite: {
    optimizeDeps: {
      include: ['@google/gsi'] // This might not be necessary, but you can keep it if you are using this package
    }
    // ... other Vite options
  }
};

export default config;

