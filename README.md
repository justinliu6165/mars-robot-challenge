# Martian Robots coding challenge

## The Problem
The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth. You are to write a program that determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).

A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the instructions:
- Left : the robot turns left 90 degrees and remains on the current grid point.
- Right : the robot turns right 90 degrees and remains on the current grid point.
- Forward : the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).

There is also a possibility that additional command types may be required in the future and provision should be made for this.

Since the grid is rectangular and bounded (...yes Mars is a strange planet), a robot that moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that prohibits future robots from dropping off the world at the same grid point. The scent is left at the last grid position the robot occupied before disappearing over the edge. An instruction to move “off” the world from a grid point from which a robot has been previously lost is simply ignored by the current robot.

### TLDR

- Mars is a rectangular and bounded grid.
- Sample input consists of multiple lines.
  - First line are the upper-right coordinates of the rectangular world, lower-left assumed 0,0.
  - Each two lines after are the robot's:
    - starting position and orientation
    - movement commands (R=turn right, L=turn left, F=move forward)
- The maximum value for any coordinate is 50.
- If robot moves off the grid, then it becomes LOST.
- Coordinate then will not be entered again.

```
Sample Input

5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
```

```
Sample Output

1 1 E
3 3 N LOST
2 3 S
```

## How to run code

***Prerequisites***: **Node.js** ([download here](https://nodejs.org/en/download/)).

1. Insert input data as shown above in the `sampeInput.txt` file (Sample data already added to file).
2. Open terminal in this directory and run `node index.js`.
3. A summary of the input and the output data should appear in the console. Ouptut data is the same format as `Sample Output` example below.

## Further steps to take
1. Write unit tests to preserve working code during later changes.
  a. Test `createRobot` factory function
  b. Test `moveForward` function
  c. Test `changeOrientation` function
  d. Test to see if out of bounds reached, will it be marked as lost location
  e. Test to see if previous lost location will be entered again.
  f. Test to see if input length exceeds 100
  g. Test to see if any coordinates exceed 50
2. Create a simple GUI to show movement of robots
3. Include a simple form to enter input data
