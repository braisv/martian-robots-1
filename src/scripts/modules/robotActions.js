/*
 * defines the movement of a robot across the grid
 */

define(["underscore", "common", "robot"], function(_, common, robotObj) {
	"use strict";

	var _lostList = []; //manages grid points of lost robots

	// parse and process bot instructions
	var instructBot = function (bot, instructionsStr) {

		instructionsStr = instructionsStr.trim().substring(0, common.defaults.maxInstruction); // limit instructions to defined limit

		for (var i = 0; i < instructionsStr.length; i++) {
			if(_processCommands(instructionsStr.charAt(i).toUpperCase(), bot) === false) {
				break;
			}
		}
		return bot;
	};

	// determines which type of move to execute: L/R/F
	var _processCommands = function (char, bot) {
		switch (char) {
			case "L":
			case "R":
				bot.orientation = _robotCommands.turnBot(bot.orientation, char);
				break;
			case "F":
				_robotCommands.moveBot(bot);
				break;
			default: 
				console.log("Invalid command received while processing '" + bot.name + "', moving to next character.");
		}

		return bot.isAlive; // dealbreaking flag, halts looping on false
	};

	// store command types in this object; this should support "bolting" on future commands. 
	// _processCommands will need new keys to call new command types
	var _robotCommands = {
		turnBot: function(orientation, char) {
			return _turnBot(orientation, char);
		},
		moveBot: function(bot) {
			_moveBot(bot);
		}
	};

	// turn bot L/R and return new orientaion
	var _turnBot = function(orientation, direction) {
		var angle = common.cardinalPoints.getDegree(orientation);

		if(direction.toUpperCase() === "R") {
			angle = (angle === 270) ? 0 : angle + 90; // make sure angle never becomes 360 since that value is not mapped
		}
		else if (direction.toUpperCase() === "L") {
			angle = (angle === 0) ? 270 : angle - 90; // make sure angle never becomes 360 since that value is not mapped
		}

		return common.cardinalPoints.getPointName(angle); // orientation is defined in cardinal points so lets go back to that instead of angles
	};

	var _processMotion = function(bot, tempPos, axis) {
    axis = axis.toLowerCase();
    switch (_hasScent(bot.coords(), tempPos, common.defaults[axis + "Bounds"])) {
        case true:
          break;
        case false:
          bot.isAlive = false;
          _lostList.push(bot.xPos + ", " + bot.yPos);
          break;
        case null:
          bot[axis + "Pos"] = tempPos;
          break;
      }
  };
  
  var _moveBot = function(bot) {

		// orientation determines which axis to increment/decrement along
		switch (bot.orientation) {
				case "N":
          _processMotion(bot, (bot.yPos + 1), "y");
					break;
				case "S":
					_processMotion(bot, (bot.yPos - 1), "y");
					break;
				case "E":
					_processMotion(bot, (bot.xPos + 1), "x");
					break;
				case "W":
					_processMotion(bot, (bot.xPos - 1), "x");
					break;
		}

	};

	var _hasScent = function(posStr, tempPos, posBounds) {

		if (_.contains(_lostList, posStr) && !common.isPosSafe(tempPos,posBounds)) {
			return true; 
//      check if location has scent by looking in the lost list
//      then if the next move is fatal, don't move robot
		}
		else {
			if(!common.isPosSafe(tempPos,posBounds)) {
				return false; 
//         if location does NOT have a scent and the next move is fatal let it happen, 
//        but add the location to the lost list and update the bot status to LOST
			}
			else {
				return null; // if the next move is safe let it happen
			}
		}

	};

	return {
		defaults: common.defaults,
		instructBot: instructBot
	};
});