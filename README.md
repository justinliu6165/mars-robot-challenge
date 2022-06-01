# Martian Robots

## Red Badger coding challenge

- Mars is a rectangular and bounded grid
- First line is size of the grid.
- Every two lines that follow are:
  - starting position and orientation
  - movement commands (R=turn right, L=turn left, F=move forward)
- The maximum value for any coordinate is 50.
- If robot moves off the grid, then it becomes LOST.

## How to run code

Prerequisites: **Node.js** ([download here](https://nodejs.org/en/download/)).

1. Insert input data as shown below in the `sampeInput.txt` file (Sample data already added to file).
2. Open terminal in this directory and run `node index.js`.
3. A summary of the input and the output data should appear in the console. Ouptut data is the same format as `Sample Output` example below.

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
## Additonal steps
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

---

Attempted by Justin Liu
On 01/06/22

---
