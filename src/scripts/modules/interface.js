/*
 * Controls the UI
 */

define(["robot", "robotActions", "common", "marsGrid"], function(robotObj, robotActions, common, marsGrid) {
	"use strict";
	
	var errorStr = "Your instructions are incorrectly formatted. \n Please remember that the first line of input is used as the upper-right bounds.";
	var instructionsQueue;
	var initBotsBtn = document.getElementById("initialize-bots");
	var inputArea = document.getElementById("input"), outputArea = document.getElementById("output");
	var sampleInputBtn = document.getElementById("sample-input");
	var moveBotsBtn = document.getElementById("move-bots");
	var botDataTableHeader = [['ID', 'X', 'Y', 'Orientation']]; // initialized with chart table headers 
	
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
		var inputArr = inputStr.split("\n\n");
		var output = "";
		instructionsQueue = [];
		
		var botDataTableBody = inputArr.map(function(instruction, i) {
			var currentInstructionSet = instruction.split("\n");
			if (i === 0) {
				var defaultsArr = currentInstructionSet[0].split(" ");
				common.defaults.xBounds = defaultsArr[0];
				common.defaults.yBounds = defaultsArr[1];
				currentInstructionSet.shift(); // after we get the bounds delete its element from the instruction array.  
			}
				
			var posArr = currentInstructionSet[0].trim().split(" ");
			var bot = new robotObj.robot("Bot #" + (i+1), posArr[0], posArr[1], posArr[2], true); // create a robot with the line 1 of each instruction pair
			
			if(bot.isBotValid()) {
				instructionsQueue.push({robot: bot, instruction: currentInstructionSet[1]}); 
				// args example ("1 1 E", 1, 1, "E")
				return [bot.toString(), bot.xPos, bot.yPos, bot.orientation]; // populate bot datatable of initial positions on the grid
			}
			else {
				output += "Failed to create '" + bot.name + "' with position '" + currentInstructionSet[0].trim() + "', please view logs. \n";
				return;
			}
		});

		outputArea.innerHTML = output;
		marsGrid.updateBotState(botDataTableHeader.concat(botDataTableBody)); // the chart takes a datatable of robot properties
	};
	
	var sampleInputBtnHandler = function() {
    var sampleInputBtnStr = "5 3 \n";
				sampleInputBtnStr += "1 1 E \n";
				sampleInputBtnStr += "RFRFRFRF \n\n";
				sampleInputBtnStr += "3 2 N \n";
				sampleInputBtnStr += "FRRFLLFFRRFLL \n\n";
				sampleInputBtnStr += "0 3 W \n";
				sampleInputBtnStr += "LLFFFLFLFL";
		
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
    moveBotsBtn.addEventListener("click", function(event) {
			outputArea.innerHTML = "";
			var output = "";
      
      if(isInstructionReadable(inputArea.value)) {
				
				var botDataTableBody = instructionsQueue.map(function(item) {
					var bot = robotActions.instructBot(item.robot, item.instruction);
					return [bot.toString(), bot.xPos, bot.yPos, bot.orientation];
				});
				
				inputArea.value = "";
				marsGrid.updateBotState(botDataTableHeader.concat(botDataTableBody)); // the chart takes a datatable of robot properties
				moveBotsBtn.setAttribute("disabled",""); // disable move button
			}
			else {
				outputArea.innerHTML = errorStr;
			}
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