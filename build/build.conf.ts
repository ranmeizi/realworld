import legacy from '@vitejs/plugin-legacy';

import { babel } from '@rollup/plugin-babel';

export default (config) => ({
	...config,
	plugins: [
		...(config.plugins || []),
		legacy({
			targets: ['ie >= 11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
		}),
	],
	build: {
		target: 'es2015',
		// rollupOptions: {
		// 	plugins: [babel({ babelHelpers: 'bundled' })]
		// }
	},
});
