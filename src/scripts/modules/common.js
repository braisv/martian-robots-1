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
	
	var cardinalPoints = { 
		points: { N:0, E:90, S:180, W:270 },

		getPointName: function(findDegree) {
			for (var p in this.points) {
				if (findDegree === this.points[p]) {
					return p;
				}
			}
		},

		getDegree: function(findPoint) {
			for (var p in this.points) {
				if (findPoint === p) {
					return this.points[p];
				}
			}  
		}
	};
	
	var isPosSafe = function(pos, posBounds) {
		if(pos < 0 || pos > parseInt(posBounds, 10)) {
			return false;
		}
		else {
			return true;
		}
	};
	
	var defaultsObj = function(xBounds, yBounds, maxCoord, maxInstruction) {
		this.xBounds = isNumber(xBounds) ? 5 : parseInt(xBounds, 10);
		this.yBounds = isNumber(yBounds) ? 3 : parseInt(yBounds, 10);
		this.maxCord = isNumber(maxCord) ? 50 : parseInt(maxCord, 10);
		this.maxInstruction = isNumber(maxInstruction) ? 100 : parseInt(maxInstruction, 10);
	};
	
	return {
		defaults: defaults,
		isNumber: isNumber,
		cardinalPoints: cardinalPoints,
		isPosSafe: isPosSafe
	};
});