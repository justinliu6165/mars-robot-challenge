# Martian Robots

## Red Badger coding challenge

Input instructions for robots on Mars.

- Mars is a rectangular and bounded grid
- First line is size of the grid.
- Every two lines that follow are:
  - starting position and orientation
  - movement commands (R=turn right, L=turn left, F=move forward)
- The maximum value for any coordinate is 50.
- If robot moves off the grid, then it becomes LOST.

Sample input and output shown below. This input is read from the file `./sampleInput.txt` file.

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

Expected string: `5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL`

```
Sample Output

1 1 E
3 3 N LOST
2 3 S
```

---

Attempted by Justin Liu
On 31/05/22

---
