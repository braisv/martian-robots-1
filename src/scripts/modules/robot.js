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
		
		Object.defineProperty(this, "isAlive", {
			get: function() {
				return isAlive;
			},
			set: function(value) {
				if(typeof value === 'boolean') {
					isAlive = value;
				}
				else {
					isAlive = true;
					console.log("Warning while creating '%s'. A robot can only be alive (true) or lost (false). Invalid state value has been set to 'true'.", this.name);
				}
			}
		});
		
		this.isAlive = isAlive; // must be after the "isAlive" setter to utilize the validation in the setter
		
		this.isAliveStr = function() {
//			return aliveToString.call(this);
			return (this.isAlive === false) ? " LOST" : "";
		};
		
		this.coords = function() {
			return this.xPos + ", " + this.yPos;
		};
		
		this.isBotValid = function() {
			if(!common.isPosSafe(this.xPos , common.defaults.MAX_COORD) || !common.isPosSafe(this.yPos, common.defaults.MAX_COORD)) {
				console.log("Error creating '%s'. A single coordinate must be a positive number less than %s!", this.name, common.defaults.MAX_COORD);
				return false;
			}
			else if(common.cardinalPoints.points[this.orientation] === undefined) {
				console.log("Error creating '%s'. This orientation '%s' is not supported.", this.name, this.orientation);
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