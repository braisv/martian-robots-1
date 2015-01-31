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

require(["robotActions", "interface", "common"], function(robotActions, interface, common) {
	
	interface.init();
	
});