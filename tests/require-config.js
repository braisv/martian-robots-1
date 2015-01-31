require.config({
	shim: {
		'underscore': {
			exports: "_"
		}
	},
	baseUrl: "../src/scripts/modules",
	paths: {
		//path relative to baseURL
		underscore: "../third-party/underscore-min"
//		,jquery: "../third-party/jquery-2.1.3.min"
	}
});