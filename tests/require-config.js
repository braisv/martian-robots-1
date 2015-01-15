require.config({
	shim: {
		'underscore': {
			exports: "_"
		}
	},
	paths: {
		underscore: "../src/scripts/third-party/underscore-min",
		modules: "../src/scripts/modules"
	}
});