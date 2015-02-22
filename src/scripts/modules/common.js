/*
 * utilty functions
 */

define(function() {
	"use strict";
	
	var defaults = {};
	var xBounds = 5, yBounds = 3;
	Object.defineProperty(defaults, "xBounds", {
		get: function() {
			return xBounds;
		},
		set: function(value) {
			xBounds = isPositiveNumber(value) ? value : xBounds;
		}
	});

	Object.defineProperty(defaults, "yBounds", {
		get: function() {
			return yBounds;
		},
		set: function(value) {
			yBounds = isPositiveNumber(value) ? value : yBounds;
		}
	});

	/**
	 * ensure these constants for the defaults object can't be overwritten
	 */
	Object.defineProperty(defaults, "MAX_COORD", { value: 50 });
	Object.defineProperty(defaults, "MAX_INSTRUCTION", { value: 100 });
	
	
	var isNumber = function(value) {
		if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
			return true;
		return false;
	};
	
	var isPositiveNumber = function(value) {
		if (isNumber(value) && value > 0) 
			return true;
		return false;
	};
	
	var cardinalPoints = { 
		points: {},
		
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
	
	
	/**
	 * ensure these cardinal points can't be overwritten but still show up in a for...in
	 */
	Object.defineProperty(cardinalPoints.points, "N", { value: 0, enumerable: true });
	Object.defineProperty(cardinalPoints.points, "E", { value: 90, enumerable: true });
	Object.defineProperty(cardinalPoints.points, "S", { value: 180, enumerable: true });
	Object.defineProperty(cardinalPoints.points, "W", { value: 270, enumerable: true });
	
	
	
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
		isPositiveNumber: isPositiveNumber,
		cardinalPoints: cardinalPoints,
		isPosSafe: isPosSafe
	};
});