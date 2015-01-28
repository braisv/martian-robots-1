define(["jquery", "robotActions", "common"], function($, robotActions, common) {
	"use strict";
	
	var readTextArea = function() {
		var inputArr = $("#input").html().split("\n\n");
		var output;

		for(var i = 0; i < inputArr.length; i++) {
			var currentInstructionSet = inputArr[i].split("\n");
			// the first line of the first instruction sets the bounds
			if (i === 0) {
				var currentInstructionSet = inputArr[i].split("\n");
				if(currentInstructionSet.length === 3)	{
					var defaultsArr = currentInstructionSet[0].split(" ");
					common.defaults.xBounds = defaultsArr[0];
					common.defaults.yBounds = defaultsArr[1];
					output = robotActions.instructBot("Bot ${i}", currentInstructionSet[1], currentInstructionSet[2]);
				}
				else {
					output = robotActions.instructBot("Bot ${i}", currentInstructionSet[0], currentInstructionSet[1]);
				}
			}
			else {
				output = robotActions.instructBot("Bot ${i}", currentInstructionSet[0], currentInstructionSet[1]);
			}

			$("#output").append("<p>" + output + "</p>");
		}
	}
	
	var init = function() {
		$("#read-instructions").click(function() {
			$("#output").html("");
			readTextArea();
		});
	}
		
	return {
		init: init
	}
	
});