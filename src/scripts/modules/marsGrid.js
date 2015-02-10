/*
 * Using the google visualizations api to represent planet mars as a grid
 * dependencies:
 * 1. https://google-developers.appspot.com/chart/interactive/docs/gallery/bubblechart
 * 2. https://github.com/millermedeiros/requirejs-plugins
 */

define(['common', 'goog!visualization,1,packages:[corechart,geochart]'], function(common) {
	"use strict";
	
	var chart, options, data;
	
	var drawChart = function() {
    
    var initializeBots = [
      ['ID', 'X', 'Y', 'Orientation'],
      ['Bot 1',    0,              0, 'N'],
      ['Bot 2',    0,              1, 'E'],
      ['Bot 3',    0,               2, 'S'],
      ['Bot 4',    0,               3, 'W']
    ];

    data = google.visualization.arrayToDataTable(initializeBots); 

    options = {
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
      },
      hAxis: {minValue: 0, maxValue: parseInt(common.defaults.xBounds, 10)},
      vAxis: {minValue: 0, maxValue: parseInt(common.defaults.yBounds, 10)}
    };
		
    chart.draw(data, options);
		
	};
  
	var updateBotState = function(newState) {
		data = google.visualization.arrayToDataTable(newState);
    console.log(common.defaults.xBounds + " " + options);
		chart.draw(data, options);
	};	
		
  var initializeChart = function(targetElement) {
		chart = new google.visualization.BubbleChart(targetElement);
    google.load("visualization", "1", {packages:["corechart"], callback: drawChart});
  };
	
	return {
		updateBotState: updateBotState,
		initializeChart: initializeChart
	};
});