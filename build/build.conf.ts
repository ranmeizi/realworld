import legacy from '@vitejs/plugin-legacy';

export default (config) => ({
	...config,
	plugins: [
		...(config.plugins || []),
		legacy({
			targets: ['ie >= 11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
		})
	],
	build: {
		target: 'es2015',
		commonjsOptions: {
		  transformMixedEsModules: true
		}
	  }
});
