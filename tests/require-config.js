require.config({
	shim: {
		'underscore': {
			exports: "_"
		}
	},
	baseUrl: "../src/scripts/modules",
	paths: {
		//path relative to baseURL
		propertyParser: '../third-party/requirejs-plugins/propertyParser', // requirejs-plugins dependency
		async: '../third-party/requirejs-plugins/async',
		goog: '../third-party/requirejs-plugins/goog',
		underscore: "../third-party/underscore-min"
	}
});