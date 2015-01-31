require.config({
	shim: {
		'underscore': {
			exports: "_"
		}
	},
	paths: {
		underscore: "../third-party/underscore-min",
		jquery: "../third-party/jquery-2.1.3.min"
	}
});

require(["interface"], function(interface) {
	
	interface.init();
	
});