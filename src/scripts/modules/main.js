/*
 * Third Party Dependency
 * https://github.com/millermedeiros/requirejs-plugins
 */

require.config({
	waitSeconds : 15, //make sure it is enough to load all scripts
	shim: {
		'underscore': {
			exports: "_"
		}
	},
	paths: {
		propertyParser: '../third-party/requirejs-plugins/propertyParser', // requirejs-plugins dependency
		async: '../third-party/requirejs-plugins/async',
		goog: '../third-party/requirejs-plugins/goog',
		underscore: "../third-party/underscore-min"
	}
});

require(["interface"], function(interface) {
	
	interface.init();
	
});