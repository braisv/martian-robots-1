/*
 * defines a robot and its current state
 */

define(["common"], function(common) {
	"use strict";

	// robot definition
	var robot = function(name, xPos, yPos, orientation, isAlive) {
		this.name = name;
		this.xPos = parseInt(xPos, 10);
		this.yPos = parseInt(yPos, 10);
		this.orientation = orientation.toUpperCase();
		this.isAlive = (typeof isAlive === 'boolean') ? isAlive : true; // force anything non boolean values to be true
		
		this.coords = function() {
			return this.xPos + ", " + this.yPos;
		};
		
		this.isAliveStr = function() {
			return (!this.isAlive) ? " LOST" : ""; 
		};
		
		this.isBotValid = function() {
			if(!common.isPosSafe(this.xPos , common.defaults.maxCoord) || !common.isPosSafe(this.yPos, common.defaults.maxCoord)) {
				console.log("Error creating '%s'. A single coordinate must be a positive number less than %s!", this.name, common.defaults.maxCoord);
				return false;
			}
			else if(common.cardinalPoints.points[this.orientation] === undefined) {
				console.log("Error creating '%s'. This orientation '%s' is not supported.", this.name, this.orientation);
				return false;
			}
			else if(typeof this.isAlive !== 'boolean') {
				console.log("Error creating '%s'. A robot can only be alive (true) or lost (false)", this.name);
				return false;
			}
			else {
				return true;
			}
		};
	};
	
	robot.prototype.toString = function() {
		return this.xPos + " " + this.yPos + " " + this.orientation + this.isAliveStr();
	};
	
	return {
		robot: robot
	};
	
});