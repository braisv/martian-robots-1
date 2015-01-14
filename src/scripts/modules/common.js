define([], function() {
	"use strict";
	
	var defaults = {
		xBounds: 5, yBounds: 3, maxCoord: 50, maxInstruction: 100
	};
	
	var isPosSafe = function(pos, posBounds) {
		if(pos < 0 || pos > parseInt(posBounds, 10)) {
			return false;
		}
		else {
			return true;
		}
	};
	
	return {
		defaults: defaults,
		isPosSafe: isPosSafe
	}
});