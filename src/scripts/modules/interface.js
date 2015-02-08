define(["robotActions", "common"], function(robotActions, common) {
	"use strict";
	
	var errorStr = "Your instructions are incorrectly formatted. \n Please remember that the first line of input is used as the upper-right bounds.";
	
	/*
	 * this function does NOT validate instructions.
	 * a readable instruction is one that has at least 3 lines. 
	 * 1. upper bounds
	 * 2. robot position
	 * 3. robot movement instructions 
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
	
	var readTextArea = function(inputStr) {
		var inputArr = inputStr.split("\n\n");
		var output;

		for(var i = 0; i < inputArr.length; i++) {
			var currentInstructionSet = inputArr[i].split("\n");
			// the first line of the first instruction sets the bounds
			if (i === 0) {
					var defaultsArr = currentInstructionSet[0].split(" ");
					common.defaults.xBounds = common.isNumber(defaultsArr[0]) ? defaultsArr[0] : common.defaults.xBounds;
					common.defaults.yBounds = common.isNumber(defaultsArr[1]) ? defaultsArr[1] : common.defaults.yBounds;
					output = robotActions.instructBot("Bot ${i}", currentInstructionSet[1], currentInstructionSet[2]);
			}
			else {
				output = robotActions.instructBot("Bot ${i}", currentInstructionSet[0], currentInstructionSet[1]);
			}

      document.getElementById("output").innerHTML += "<p>" + output + "</p>";
		}
	};
	
	var sampleInput = function() {
		var inputArea = document.getElementById("input");
    var sampleInputStr = "5 3 \n\
1 1 E \n\
RFRFRFRF \n\n\
3 2 N \n\
FRRFLLFFRRFLL \n\n\
0 3 W \n\
LLFFFLFLFL";
		
    document.getElementById("get-help").addEventListener("click", function(event) {
			inputArea.value = sampleInputStr;
    }, false);
			
	};
	
	var runBtn = function() {
		var inputArea = document.getElementById("input");
    
    document.getElementById("read-instructions").addEventListener("click", function(event) {
      document.getElementById("output").innerHTML = "";
      
      if(isInstructionReadable(inputArea.value)) {
          readTextArea(inputArea.value);
          inputArea.value = "";
        }
        else {
          document.getElementById("output").innerHTML = errorStr;
        }
    }, false);
    
	};
  
  var drawChart = function() {
    
    var setBots = [
      ['ID', 'X', 'Y', 'Orientation'],
      ['Bot 1',    1,              1, 'E'],
      ['Bot 2',    3,              2, 'N'],
      ['Bot 3',    0,               3, 'W']
    ];
    
    var moveBots = [
      ['ID', 'X', 'Y', 'Orientation'],
      ['Bot 1',    1,              1, 'E'],
      ['Bot 2',    3,              3, 'N'],
      ['Bot 3',    2,               3, 'S']
    ];

    var data = google.visualization.arrayToDataTable(setBots);

    var options = {
      title: 'The Planet Mars as a Grid',
      bubble: {textStyle: {fontSize: 11}},
      animation: {
        duration: 1000,
        easing: 'inAndOut',
        startup: true
      },
      series: {'N': {color: 'red'},
               'E': {color: 'yellow'},
               'S': {color: 'blue'},
               'W': {color: 'green'}
      }
//      ,
//      hAxis: {minValue: 0, maxValue: 5},
//      vAxis: {minValue: 0, maxValue: 3}
    };

    var chart = new google.visualization.BubbleChart(document.getElementById('planet-mars'));
    chart.draw(data, options);
    
    document.getElementById("set-bots").addEventListener("click", function(event) {
      data = google.visualization.arrayToDataTable(setBots);
      chart.draw(data, options);
    }, false);
    
    document.getElementById("move-bots").addEventListener("click", function(event) {
      data = google.visualization.arrayToDataTable(moveBots);
      chart.draw(data, options);
    }, false);
  };
  
  var showChart = function() {
    google.load("visualization", "1", {packages:["corechart"], callback: drawChart});
    
    
  };
	
	var init = function() {
		runBtn();
		sampleInput();
    showChart();
	};
		
	return {
		testInstructions: isInstructionReadable,
		init: init
	};
	
});