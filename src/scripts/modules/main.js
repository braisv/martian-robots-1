require.config({
	shim: {
		'underscore': {
			exports: "_"
		}
	},
	paths: {
		underscore: "../third-party/underscore-min"
	}
});

require(["interface"], function(interface) {
	
	interface.init();
	
});