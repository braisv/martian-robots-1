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

require(["robotActions", "interface", "common"], function(robotActions, interface, common) {
	
	interface.init();
//	console.log(robotActions.instructBot("bot1", "1 1 E", "RFRFRFRF"));
//	console.log(robotActions.instructBot("bot2", "3 2 N", "FRRFLLFFRRFLL"));
//	console.log(robotActions.instructBot("bot3", "0 3 W", "LLFFFLFLFL"));
	
});