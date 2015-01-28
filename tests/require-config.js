require.config({
	shim: {
		'underscore': {
			exports: "_"
		}
	},
	baseUrl: "../src/scripts/modules",
	paths: {
		underscore: "../third-party/underscore-min" //path relative to baseURL
	}
});