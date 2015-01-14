require.config({
	shim: {
		'underscore': {
			exports: "_"
		}
	},
	paths: {
		underscore: "third-party/underscore-min"
	}
});

require(["modules/robotActions"], function(robotActions) {

	console.log(robotActions.instructBot("bot1", "1 1 E", "RFRFRFRF"));
	console.log(robotActions.instructBot("bot2", "3 2 N", "FRRFLLFFRRFLL"));
	console.log(robotActions.instructBot("bot3", "0 3 W", "LLFFFLFLFL"));
	
});