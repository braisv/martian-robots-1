define(["common"], function(common) {
	"use strict";

	// robot definition
	var robot = function(name, xPos, yPos, orientation, isAlive) {
		this.name = name;
		this.xPos = parseInt(xPos, 10);
		this.yPos = parseInt(yPos, 10);
		
		this.coords = function() {
			return this.xPos + ", " + this.yPos;
		};
		
		this.orientation = orientation.toUpperCase();
		this.isAlive = isAlive;
		
		this.isAliveStr = function() {
			return (!this.isAlive) ? " LOST" : "";
		};
		
		this.output = function() {
			var outputStr = this.xPos + " " + this.yPos + " " + this.orientation + this.isAliveStr();
			return outputStr;
		};
		
		this.isBotValid = function() {
			if(!common.isPosSafe(this.xPos , common.defaults.maxCoord) || !common.isPosSafe(this.yPos, common.defaults.maxCoord)) {
				console.log("Error creating '%s'. A single coordinate must be a positive number less than %s!", this.name, common.defaults.maxCoord);
				return false;
			}
			else {
				return true;
			}
		};
	};
	
	return {
		robot: robot
	}
	
});