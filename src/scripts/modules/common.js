/*
 * utilty functions
 */

define(function() {
	"use strict";
	
	var defaults = {
		xBounds: 5, yBounds: 3, maxCoord: 50, maxInstruction: 100
	};
	
	/* 
	 * [1-9] check if value is a positive number 
	 * [0-9] check if value greater than 0
	 */
	var isNumber = function(value) {
		if(/^(\-|\+)?([1-9]+|Infinity)$/.test(value))
			return true;
		return false;
	};
	
	var defaultsObj = function(xBounds, yBounds, maxCoord, maxInstruction) {
		this.xBounds = isNumber(xBounds) ? 5 : parseInt(xBounds, 10);
		this.yBounds = isNumber(yBounds) ? 3 : parseInt(yBounds, 10);
		this.maxCord = isNumber(maxCord) ? 50 : parseInt(maxCord, 10);
		this.maxInstruction = isNumber(maxInstruction) ? 100 : parseInt(maxInstruction, 10);
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
		isNumber: isNumber,
		defaults: defaults,
		isPosSafe: isPosSafe
	};
});