# Martian Robots #

Martian Robots is a small app to demo some aspects of modern JavaScript development outside of typical jQuery styled DOM manipulation. Known bugs are listed on [Trello](https://trello.com/b/k5HmJlax/martian-robots).  
Dependencies include:  
- require.js + r optimizer  
- underscore.js  
- google visualisation charts  
- grunt  
- qunit  

### How to run ###
The app can be ran locally or at the provided URL.  
- Locally: [Download](https://bitbucket.org/komplexb/martian-robots/downloads) the repo and run `../src/index.html`. 
A few tests are available a `../tests/index.html`.  
- Online: http://komplexb.bitbucket.org/martian-robots/index.html  

### How to use ###
1. Enter instructions or click "Sample Input" to insert instructions into the text area.  
2. Click "Initialize Bots". This sets the robots to their initial positions on the planet. Valid instructions will enable the "Move Bots" button.  
3. Click "Move Bots" to see the final position of the robots after processing the series of instructions.  
4. To validate app functionality, read the extract below to come up with valid instructions. Manually trace your instructions on along the grid to determine the final position and output. Insert these instructions into the app and test the output against your manual output.  

## About ##

### The Problem ###
The surface of Mars can be modelled by a rectangular grid around which robots are able to
move according to instructions provided from Earth. You are to write a program that
determines each sequence of robot positions and reports the final position of the robot.  

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by
y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).
A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the
instructions:  
- Left : the robot turns left 90 degrees and remains on the current grid point.  
- Right : the robot turns right 90 degrees and remains on the current grid point.  
- Forward : the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.  

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).
There is also a possibility that additional command types maybe required in the future and
provision should be made for this.  

Since the grid is rectangular and bounded (…yes Mars is a strange planet), a robot that
moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that
prohibits future robots from dropping off the world at the same grid point. The scent is left at
the last grid position the robot occupied before disappearing over the edge. An instruction to
move “off” the world from a grid point from which a robot has been previously lost is simply
ignored by the current robot.  

### The Input ###
The first line of input is the upper-right coordinates of the rectangular world, the lower-left
coordinates are assumed to be 0, 0.  

The remaining input consists of a sequence of robot positions and instructions (two lines per
robot). A position consists of two integers specifying the initial coordinates of the robot and
an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a
string of the letters “L”, “R”, and “F” on one line.  

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the
next robot begins execution.  

The maximum value for any coordinate is 50.  

All instruction strings will be less than 100 characters in length.

### The Output ###
For each robot position/instruction in the input, the output should indicate the final grid
position and orientation of the robot. If a robot falls off the edge of the grid the word “LOST”
should be printed after the position and orientation.  

#### Sample Input ####
5 3  
1 1 E  
RFRFRFRF  

3 2 N  
FRRFLLFFRRFLL  

0 3 W  
LLFFFLFLFL  

#### Sample Output ####
1 1 E  
3 3 N LOST  
2 3 S