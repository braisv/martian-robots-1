# Martian Robots #

### Purpose ###
*A do nothing demo/learning app to show that I can write all the codez.*  
Jokes aside, I wanted to build something small to apply some of my learnings from the [es6.io](https://goo.gl/CAHYi0) course.  
P.S. https://leanpub.com/exploring-es6/ is a great companion for the course.  

### How to run ###
- install: `npm install -g`  
- run: `martian-robots`
- help: `help`
- Or try the Web version: http://clumsy-year.surge.sh  | [GitHub](https://github.com/komplexb/martian-robots-web) 

![Screenshot 2016-10-25 11.11.00.png](https://bitbucket.org/repo/zedyk9/images/4143475014-Screenshot%202016-10-25%2011.11.00.png)

### Tests ###
- `npm start`  
- Go to: http://localhost:3000/tests/index.html  
OR
- `npm watch:test`


### The Problem ###
The surface of Mars can be modeled by a rectangular grid around which robots are able to
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

Martians do not have the same limitations as robots;  they can go off the grid, i.e. not get lost. You can test this by instructing a martian to go beyond the location of a lost robot.

### The Output ###
For each martian/robot position/instruction in the input, the output should indicate the final grid
position and orientation of the martian/robot. If a robot falls off the edge of the grid the word “LOST”
should be printed after the position and orientation.  

#### Sample Input ####
**Run `demo` to automatically run sample input below.**

Bounds: x: 5, y: 3  

- `instruct 1 1 E RFRFRFRF`
- `instruct 3 2 N FRRFLLFFRRFLL`
- `instruct 0 3 W LLFFFLFLFL`
- `instruct -m 3 2 N FRRFLLFFRRFLLFFF`

#### Sample Output ####
- 1 1 E => 🤖 1 1 ➡️
- 3 3 N LOST => 🤖 3 3 ⬆️ 🆘
- 2 3 S => 🤖 2 3 ⬇️
- 3 6 N => 👾 3 6 ⬆️
