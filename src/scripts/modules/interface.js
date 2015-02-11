/*
 * Controls the UI
 */

define(["robotActions", "common", "marsGrid"], function(robotActions, common, marsGrid) {
	"use strict";
	
	var errorStr = "Your instructions are incorrectly formatted. \n Please remember that the first line of input is used as the upper-right bounds.";
	var instructionsQueue = [];
	var initBotsBtn = document.getElementById("initialize-bots");
	var inputArea = document.getElementById("input"), outputArea = document.getElementById("output");
	var sampleInputBtn = document.getElementById("sample-input");
	var moveBotsBtn = document.getElementById("move-bots");
	
	/*
	 * this function validates the format of instructions.
	 * a readable instruction is one that has at least 3 lines. 
	 * Line: 
	 * 1. upper bounds
	 * 2. robot position
	 * 3. robot movement instructions 
	 * 
	 */
	
	var isInstructionReadable = function(inputStr) {
		if(inputStr.length === 0) {
			return false;
		}
		if(inputStr.length > 0) {
			if(inputStr.split("\n").length < 3) {
				//we need at least 3 lines to try and do anything valuable
				return false;
			}
			if(inputStr.split("\n").length >= 3) {
				return true;
			}
		}
	};
	
	var initializeBotPositions = function(inputStr) {
		var setBots = [['ID', 'X', 'Y', 'Orientation']];
		var inputArr = inputStr.split("\n\n");
		var output;

		for(var i = 0; i < inputArr.length; i++) {
			var currentInstructionSet = inputArr[i].split("\n");
			// the first line of the first instruction sets the bounds
			if (i === 0) {
				var defaultsArr = currentInstructionSet[0].split(" ");
				common.defaults.xBounds = common.isNumber(defaultsArr[0]) ? defaultsArr[0] : common.defaults.xBounds;
				common.defaults.yBounds = common.isNumber(defaultsArr[1]) ? defaultsArr[1] : common.defaults.yBounds;
				currentInstructionSet.shift(); // after we get the bounds delete its element from the instruction array.  
			}
				
			var posArr = currentInstructionSet[0].trim().split(" ");
			// args example ("1 1 E", 1, 1, "E")
			setBots.push([currentInstructionSet[0], parseInt(posArr[0], 10), parseInt(posArr[1], 10), posArr[2]]);
			// args example (position string, instructions string)	
			instructionsQueue.push([currentInstructionSet[0], currentInstructionSet[1]]); 
		}
		
		marsGrid.updateBotState(setBots); 
	};
	
	var sampleInputBtnHandler = function() {
    var sampleInputBtnStr = "5 3 \n\
1 1 E \n\
RFRFRFRF \n\n\
3 2 N \n\
FRRFLLFFRRFLL \n\n\
0 3 W \n\
LLFFFLFLFL";
		
    sampleInputBtn.addEventListener("click", function(event) {
			inputArea.value = sampleInputBtnStr;
			
    }, false);
			
	};
	
	var initBotsBtnHandler = function() {
		initBotsBtn.addEventListener("click", function(event) {
				
			outputArea.innerHTML = "";
      
      if(isInstructionReadable(inputArea.value)) {
				initializeBotPositions(inputArea.value);
				moveBotsBtn.removeAttribute("disabled"); // enable move button
			}
			else {
				outputArea.innerHTML = errorStr;
			}
			
			}, false);
	};
	
	var moveBotsBtnHandler = function() {
    var output = "", bot;
    var setBots = [['ID', 'X', 'Y', 'Orientation']]; 
		
    moveBotsBtn.addEventListener("click", function(event) {
		outputArea.innerHTML = "";
      
      if(isInstructionReadable(inputArea.value)) {
				for(var j = 0; j < instructionsQueue.length; j++) {
					instruction = instructionsQueue[j];
					// args: botName, initial position string, movement instructions
					bot = robotActions.instructBot("Bot #" + j, instruction[0], instruction[1]); 
					setBots.push([bot.output(), bot.xPos, bot.yPos, bot.orientation]);
				}
				inputArea.value = "";
				marsGrid.updateBotState(setBots);
				moveBotsBtn.setAttribute("disabled",""); // disable move button
			}
			else {
				outputArea.innerHTML = errorStr;
			}
//		outputArea.innerHTML = output;
    }, false);
    
	};
	
	var init = function() {
		marsGrid.initializeChart(document.getElementById('planet-mars'));
		initBotsBtnHandler();
		moveBotsBtnHandler();
		sampleInputBtnHandler();
	};
		
	return {
		testInstructions: isInstructionReadable,
		init: init
	};
	
});