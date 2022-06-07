import sveltePreprocess from 'svelte-preprocess'
import { less } from 'svelte-preprocess-less';

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [sveltePreprocess(), { style: less() }]
}
