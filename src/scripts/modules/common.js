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
	
	return {
		defaults: defaults,
		isNumber: isNumber,
		cardinalPoints: cardinalPoints,
		isPosSafe: isPosSafe
	};
});