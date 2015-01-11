var botModule = (function () {
  
  var _lostList = []; //manages grid points of lost robots
  
  // cardinal points "map" with handy lookup methods
  var _cardinalPoints = { 
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
      var maxCoord = 50;
      if(!_isPosSafe(this.xPos , maxCoord) || !_isPosSafe(this.yPos, maxCoord)) {
        console.log("Error creating '%s'. A single coordinate must be a positive number less than %s!", this.name, maxCoord);
        return false;
      }
      else {
        return true;
      }
    };
	};
  
  // parse and process bot instructions
  var instructBot = function (botName, positionStr, instructionsStr) {
    var limit = 100; // instruction string limit
    var posArr = positionStr.split(" ");
    
    var bot = new robot(botName, posArr[0], posArr[1], posArr[2], true); // create a new robot based on instructions
    
    // only process instructions if the bot is valid
    if (bot.isBotValid()) {
      instructionsStr = instructionsStr.substring(0,limit);
      
      for (var i = 0; i < instructionsStr.length; i++) {
        if(_processMotion(instructionsStr.charAt(i).toUpperCase(), bot) === false) {
          break;
        }
      }
      
      return bot.output();
    }
    else {
      return "Failed to create '" + botName + "', please view logs.";
    }
  };
	
  // determines which type of move to execute: L/R/F
  var _processMotion = function (char, bot) {
    switch (char) {
      case "L":
      case "R":
        bot.orientation = _turnBot(bot.orientation, char);
        break;
      case "F":
        _moveBot(bot);
        break;
      default: 
        console.log("Invalid character received while processing '" + bot.name + "', moving to next character.");
    }

    return bot.isAlive; // dealbreaking flag, halts looping on false
  };
  
  // turn bot L/R and return new orientaion
  var _turnBot = function(orientation, direction) {
    var angle = _cardinalPoints.getDegree(orientation);
    
		if(direction.toUpperCase() === "R") {
			angle = (angle === 270) ? 0 : angle + 90; // make sure angle never becomes 360 since that value is not mapped
		}
		else if (direction.toUpperCase() === "L") {
			angle = (angle === 0) ? 270 : angle - 90; // make sure angle never becomes 360 since that value is not mapped
		}
		
    return _cardinalPoints.getPointName(angle); // orientation is defined in cardinal points so lets go back to that instead of angles
	};
  
  var _moveBot = function(bot) {
    var xBounds = 5, yBounds = 3, tempPos = 0;
    
    // orientation determines which axis to increment/decrement along
    switch (bot.orientation) {
        case "N":
          tempPos = bot.yPos + 1;
          switch (_hasScent(bot.coords(), tempPos, yBounds)) {
            case true:
              break;
            case false:
              bot.isAlive = false;
              _lostList.push(bot.xPos + ", " + bot.yPos);
              break;
            case null:
              bot.yPos = tempPos;
              break;
          }
          break;
        case "S":
          tempPos = bot.yPos - 1;
          switch (_hasScent(bot.coords(), tempPos, yBounds)) {
            case true:
              break;
            case false:
              bot.isAlive = false;
              _lostList.push(bot.xPos + ", " + bot.yPos);
              break;
            case null:
              bot.yPos = tempPos;
              break;
          }
          break;
        case "E":
          tempPos = bot.xPos + 1;
          switch (_hasScent(bot.coords(), tempPos, xBounds)) {
            case true:
              break;
            case false:
              bot.isAlive = false;
              _lostList.push(bot.xPos + ", " + bot.yPos);
              break;
            case null:
              bot.xPos = tempPos;
              break;
          }
          break;
        case "W":
          tempPos = bot.xPos - 1;
          switch (_hasScent(bot.coords(), tempPos, xBounds)) {
            case true:
              break;
            case false:
              bot.isAlive = false;
              _lostList.push(bot.xPos + ", " + bot.yPos);
              break;
            case null:
              bot.xPos = tempPos;
              break;
          }
          break;
    }
    
  };
  
  var _hasScent = function(posStr, tempPos, posBounds) {

    if (_.contains(_lostList, posStr) && !_isPosSafe(tempPos,posBounds)) {
      return true; 
//      check if location has scent by looking in the lost list
//      then if the next move is fatal, don't move robot
    }
    else {
      if(!_isPosSafe(tempPos,posBounds)) {
        return false; 
//         if location does NOT have a scent and the next move is fatal let it happen, 
//        but add the location to the lost list and update the bot status to LOST
      }
      else {
        return null; // if the next move is safe let it happen
      }
    }
    
  };
  
  // checks if a single axis point is within bounds
  var _isPosSafe = function(pos, posBounds) {
    if(pos < 0 || pos > posBounds) {
      return false;
    }
    else {
      return true;
    }
  };
	
  return {
		testMethod: robot,
		testRobot: robot,
    instructBot: instructBot
  };

})();

console.log(botModule.instructBot("bot1", "1 1 E", "RFRFRFRF"));
console.log(botModule.instructBot("bot2", "3 2 N", "FRRFLLFFRRFLL"));
console.log(botModule.instructBot("bot4", "0 51 W", "LLFFFLFLFL"));
console.log(botModule.instructBot("bot3", "0 3 W", "LLFFFLFLFL"));

//var bot1 = new botModule.testRobot("testBot", 1, 51, "e", true);
//console.log(bot1());
//
//var bot2 = new botModule.testRobot("testBot", 3, 2, "n", false);
//console.log(bot2.output());
