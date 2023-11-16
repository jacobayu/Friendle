// import adapter from '@sveltejs/adapter-auto';
// // import { vitePreprocess } from '@sveltejs/kit/vite';
// import preprocess from 'svelte-preprocess';


// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// 	// for more information about preprocessors
// 	preprocess: preprocess(),

// 	kit: {
// 		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
// 		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
// 		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
// 		adapter: adapter(),
// 		vite: {
// 			optimizeDeps: {
// 			  include: ['@google/gsi']
// 			}
// 		  }
// 	}
// };

// export default config;

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

