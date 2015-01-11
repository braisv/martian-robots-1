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
	var robot = function( name, xPos, yPos, orientation, status ) {
		this.name = name;
		this.xPos = xPos;
		this.yPos = yPos;
		this.orientation = orientation.toUpperCase();
		this.status = status;
		this.statusStr = (status === false) ? " LOST" : "";
	};
  
  // parse and process bot instructions
  var instructBot = function (botName, positionStr, instructionsStr) {
    var limit = 100; // instruction string limit
    var posArr = positionStr.split(" ");
    
    var bot = new robot(botName, posArr[0], posArr[1], posArr[2], true); // create a new robot based on instructions
    
    var insArr = instructionsStr.split("", limit);
    
    // process instruction characters sequentially
    for (var i = 0; i < limit; i++) {
      if(_processMotion(insArr[i], bot) === false) {
        break;
      }
    }
    
    // status string
    return bot.xPos + " " + bot.yPos + " " + bot.orientation + ((bot.status === false) ? " LOST" : "");
  };
	
  // determines which type of mvoe to execute: L/R/F
  var _processMotion = function (char, bot) {
    switch (char) {
      case "L":
      case "R":
        bot.orientation = _turnBot(bot.orientation, char);
        break;
      case "F":
        _moveBot(bot);
        break;
    }

    return bot.status; // dealbreaking flag, halts looping on false
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
    var posStr = bot.xPos + ", " + bot.yPos;
    
    // orientation determines which axis to increment/decrement along
    switch (bot.orientation) {
        case "N":
          tempPos = parseInt(bot.yPos, 10) + 1;
          switch (_hasScent(posStr, tempPos, yBounds)) {
            case true:
              break;
            case false:
              bot.status = false;
              _lostList.push(bot.xPos + ", " + bot.yPos);
              break;
            case null:
              bot.yPos = tempPos;
              break;
          }
          break;
        case "S":
          tempPos = parseInt(bot.yPos, 10) - 1;
          switch (_hasScent(posStr, tempPos, yBounds)) {
            case true:
              break;
            case false:
              bot.status = false;
              _lostList.push(bot.xPos + ", " + bot.yPos);
              break;
            case null:
              bot.yPos = tempPos;
              break;
          }
          break;
        case "E":
          tempPos = parseInt(bot.xPos, 10) + 1;
          switch (_hasScent(posStr, tempPos, xBounds)) {
            case true:
              break;
            case false:
              bot.status = false;
              _lostList.push(bot.xPos + ", " + bot.yPos);
              break;
            case null:
              bot.xPos = tempPos;
              break;
          }
          break;
        case "W":
          switch (_hasScent(posStr, tempPos, xBounds)) {
            case true:
              break;
            case false:
              bot.status = false;
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
		testMethod: _turnBot,
    instructBot: instructBot
  };

})();

console.log(botModule.instructBot("bot1", "1 1 E", "RFRFRFRF"));
console.log(botModule.instructBot("bot2", "3 2 N", "FRRFLLFFRRFLL"));
console.log(botModule.instructBot("bot3", "0 3 W", "LLFFFLFLFL"));