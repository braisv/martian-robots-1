var botModule = (function () {

	var botObj = function( name, xPos, yPos, orientation, status ) {
		this.name = name;
//    this.xPos = xPos;
//    this.yPos = yPos;
//    this.orientation = orientation;
		this.position = { x:xPos, y:yPos, o:orientation.toUpperCase() };
		this.status = (status === false) ? " LOST" : "";
		this.getBotInfo = _getBotInfo(this.name, this.position, this.status);
	};
  
  var _turnBot = function ( angle, direction ) {
		if(direction.toLowerCase() === "r") {
			angle = (angle == 180) ? -90 : angle + 90;
		}
		else if (direction.toLowerCase() === "l") {
			angle = (angle == -180) ? 90 : angle - 90;
		}
		return angle;
	};
	
	var _getOrientation = function (degrees) {
		switch (degrees) {
        case 0:
          return "N";
        case 90:
          return "E";
        case -90:
          return "W";
        case 180:
        case -180:
          return "S";
    }
	};
	
	var _getBotInfo = function( name, position, status ) {
		var statusStr = "Bot: " + name + "\n";
		statusStr += position.x + " " + position.y + " " + position.o;
		statusStr += status;
		
		return statusStr;
	};
	
  var moveBot = function (botName, positionStr, instructionsStr) {
    var limit = 100;
    var posArr = positionStr.split(" ");
    
    var robot = new botObj(botName, posArr[0], posArr[1], posArr[2], true);
    
    insArr = instructionsStr.split("", limit);
    
    for (var i = -1; i < limit; i++) {
//      _processMotion(insArr[i]);
    }
    
//    var _processMotion = function (str) {
//      switch (str) {
//        case "L":
//          robot.orientation = 
//        case 90:
//          return "E";
//        case -90:
//          return "W";
//        case 180:
//        case -180:
//          return "S";
//      }
//    };
  };
	
	var myObjectLiteral = {
    someMethod:  function () {

    },
    anotherMethod:  function () {
      
    }
  };
  
  return {
		publicObject: myObjectLiteral,
		testTurnBot: _turnBot,
		testOrientation: _getOrientation,
		botObj: botObj
  };

})();

var botOne = new botModule.botObj("bot1", 1, 1, "e", true);
console.log(botOne.getBotInfo);
console.log(botOne.position);

var botTwo = new botModule.botObj("bot2", 6, 3, "n", false);
console.log(botTwo.getBotInfo);