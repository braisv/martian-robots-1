var botModule = (function () {
  
  var lostList = [];
  
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
  
	var robot = function( name, xPos, yPos, orientation, status ) {
		this.name = name;
		this.xPos = xPos;
		this.yPos = yPos;
		this.orientation = orientation.toUpperCase();
		this.status = status;
		this.statusStr = (status === false) ? " LOST" : "";
	};
  
  var _turnBot = function(orientation, direction) {
    var angle = _cardinalPoints.getDegree(orientation);
    
		if(direction.toUpperCase() === "R") {
			angle = (angle === 270) ? 0 : angle + 90;
		}
		else if (direction.toUpperCase() === "L") {
			angle = (angle === 0) ? 270 : angle - 90;
		}
		
    return _cardinalPoints.getPointName(angle);
	};
  
  var _moveBot = function(bot) {
    var xBounds = 5, yBounds = 3, tempPos = 0;
//    console.log("%s; x: %s, y: %s", bot.name, bot.xPos, bot.yPos);
    
    switch (bot.orientation) {
        case "N":
          tempPos = parseInt(bot.yPos, 10) + 1;
          if(!_isPosSafe(tempPos,yBounds)) {
            bot.status = false;
          }
          else {
            bot.yPos = tempPos;
          }
          break;
        case "S":
          tempPos = parseInt(bot.yPos, 10) - 1;
          if(!_isPosSafe(tempPos,yBounds)) {
            bot.status = false;
          }
          else {
            bot.yPos = tempPos;
          }
          break;
        case "E":
          tempPos = parseInt(bot.xPos, 10) + 1;
          if(!_isPosSafe(tempPos,xBounds)) {
            bot.status = false;
          }
          else {
            bot.xPos = tempPos;
          }
          break;
        case "W":
          tempPos = parseInt(bot.xPos, 10) - 1;
          if(!_isPosSafe(tempPos,xBounds)) {
            bot.status = false;
          }
          else {
            bot.xPos = tempPos;
          }
          break;
    }
    
  };
  
  var _isPosSafe = function(pos, posBounds) {
    if(pos < 0 || pos > posBounds) {
      return false;
    }
    else {
      return true;
    }
  };
	
	var _getBotInfo = function( name, position, status ) {
		var statusStr = "Bot: " + name + "\n";
		statusStr += position.x + " " + position.y + " " + position.o;
		statusStr += status;
		
		return statusStr;
	};
	
  var instructBot = function (botName, positionStr, instructionsStr) {
    var limit = 100;
    var posArr = positionStr.split(" ");
    
    var bot = new robot(botName, posArr[0], posArr[1], posArr[2], true);
    
    var insArr = instructionsStr.split("", limit);
    
    for (var i = 0; i < limit; i++) {
      if(_processMotion(insArr[i], bot) === false) {
        break;
      }
    }
    
    var botStatusStr = bot.xPos + " " + bot.yPos + " " + bot.orientation + " " + bot.status;
//    botStatusStr += " " + bot.statusStr;
        
    return botStatusStr;
  };
	
  var _processMotion = function (str, bot) {
    switch (str) {
      case "L":
      case "R":
        bot.orientation = _turnBot(bot.orientation,str);
        break;
      case "F":
        _moveBot(bot);
        break;
    }

    return bot.status;
  };
  
  return {
		testTurnBot: _turnBot,
		robot: robot,
    instructBot: instructBot
  };

})();

console.log(botModule.instructBot("bot1", "1 1 E", "RFRFRFRF"));
console.log(botModule.instructBot("bot2", "3 2 N", "FRRFLLFFRRFLL"));
console.log(botModule.instructBot("bot3", "0 3 W", "LLFFFLFLFL"));

//var botOne = new botModule.robot("bot1", 1, 1, "e", true);
//console.log(botOne.getBotInfo);
//console.log(botOne.position);
//
//var botTwo = new botModule.robot("bot2", 6, 3, "n", false);
//console.log(botTwo.getBotInfo);