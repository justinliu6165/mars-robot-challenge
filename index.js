// 1. Fetch input from txt file
// 2. Refactor data for usability
// 3. Init grid using input data
// 4. Init robots and run
// 5. Store robot location data
// 6. Output data as string to console

const fs = require('fs');

// =========
// Fetch input from txt file
// =========

let sampleInput = '';

try {
    const data = fs.readFileSync('./sampleInput.txt', 'utf8');
    sampleInput = data.toString();
} catch (err) {
    throw new Error(err);
}

// =========
// Refactor data for usability
// =========

const refactorInput = (input) => {
    // Get grid bondaries
    let gridLayout = input.substr(0, input.indexOf('\n')).split(' ');
    
    // Get robot commands
    let robotCmds = input
        .substr(input.indexOf('\n') + 1)
        .split('\n\n')
        .map(cmds => {
            // Split starting/orientation and commands
            let cmdSplit = cmds.split('\n');

            // Split starting position and orientation
            let start = cmdSplit[0].split(' ').slice(0,2);
            let orientation = cmdSplit[0].split(' ')[cmdSplit[0].split(' ').length - 1];
            
            // Robot commands (e.g. RFLRF)
            let cmd = cmdSplit[1];

            return {
                start,
                orientation,
                cmd
            }
        }
    );

    return {
        gridLayout,
        robotCmds
    };
}

// =========
// Check thresholds
// =========
const checkInputLength = (input) => {
    if(input.length > 100) throw Error("Input cannot have more than 100 characters.")
}
const checkCoordThreshold = (coord) => {
    coord.forEach(value => {
        if(value > 50) throw Error("Coordinates cannot be more than 50.");
    }) 
}

// =========
// Factory function: Create robot instance
// =========

const createRobot = ({start=[0,0], orientation='N', cmd, bounds, lostCoordinates}) => {
    return {
        x: Number(start[0]),
        y: Number(start[1]),
        compass: ['N', 'E', 'S', 'W'],
        cmd,
        orientation,
        isLost: false,
        lostCoordinates,
        checkOutOfBounds(){
            return (
                this.x < bounds.min.x || this.x > bounds.max.x
                || this.y < bounds.min.y || this.y > bounds.max.y
            )
        },
        setLostCoord(x,y) {
            if(!this.lostCoordinates[x]) {
                this.lostCoordinates[x] = [y]
            } else {
                this.lostCoordinates[x].push(y);
            }
        },
        changeOrientation(turn) {
            let currentIdx = this.compass.indexOf(this.orientation);
    
            if(turn === 'R') {
                let nextIndex = currentIdx !== this.compass.length - 1 ? currentIdx + 1 : 0; 
                this.orientation = this.compass[nextIndex];
            } else if (turn === 'L') {
                let nextIndex = currentIdx !== 0 ? currentIdx - 1 : this.compass.length - 1; 
                this.orientation = this.compass[nextIndex];
            }
        },
        moveForward() {
            let tmpX = this.x;
            let tmpY = this.y;

            switch(this.orientation) {
                case 'N':
                    tmpY += 1;
                    break;
                case 'E':
                    tmpX += 1;
                    break;
                case 'S':
                    tmpY -= 1;
                    break;
                case 'W':
                    tmpX -= 1;
                    break;
            }
            
            // Check if lost coordinate
            let notLostCoordinate = !(this.lostCoordinates[tmpX] && this.lostCoordinates[tmpX].includes(tmpY));
            
            if(notLostCoordinate) {

                // Update coordinates to robot
                this.x = tmpX;
                this.y = tmpY;
    
                // If out of bounds, set robot as lost, set coordinate as lost coordinate
                if(this.checkOutOfBounds()) {
                    this.isLost = true;
                    this.setLostCoord(this.x, this.y);
                }

            };
        },
        moveRobot() {
            // Move forward or change orientation
            this.cmd.split('').forEach(move => {
                if (move !== 'F') {
                    this.changeOrientation(move);
                } else {
                    this.moveForward();
                }
            })
        },
        outputData() {
            return {
                x: this.x,
                y: this.y,
                orientation: this.orientation,
                isLost: this.isLost
            }
        }
    }
}

// =========
// Factory function: Create grid instance
// =========

const createGrid = (input) => {

    const setBounds = (gridLayout) => {
        return {
            min: {x: 0, y: 0},
            max: {x: Number(gridLayout[0]), y: Number(gridLayout[1])}
        }
    }

    // Check if input length is greater than 100
    checkInputLength(input);

    const { gridLayout, robotCmds } = refactorInput(input);
    
    // Check if coordinates are greater than 50
    checkCoordThreshold(gridLayout);
    robotCmds.forEach(robot => checkCoordThreshold(robot.start));

    return {
        robotCmds: robotCmds,
        results: [],
        bounds: setBounds(gridLayout),
        lostCoordinates: {},
        runRobots() {
            // Init each robots
            this.robotCmds.forEach((robotInfo) => {
                // Pass info to create new robot
                const robot = createRobot({bounds: this.bounds, lostCoordinates: this.lostCoordinates, ...robotInfo});
                
                // Move robot
                robot.moveRobot();
                
                // If lost coordinates, set to the Grid
                if(robot.isLost) {
                    this.lostCoordinates = robot.lostCoordinates;
                }

                // Push end position of robot to results
                this.results.push(robot.outputData())
            });

        },
        outputAllData() {
            return this.results.reduce((d,item) => {
                d+= `${item.x} ${item.y} ${item.orientation} ${item.isLost ? 'LOST' : ''}\n`
                return d;
            }, '');      

        }
    }
}

// =========
// Initialise grid and robots, and output to the console
// =========

const initGridAndRun = (input) => {
    // const refactoredInput = refactorInput(input);
    const grid = createGrid(input);
    
    grid.runRobots();
    
    console.log("======Input=======");
    console.log(input);
    console.log("======Input=======\n");  

    console.log("======Output======");
    console.log(grid.outputAllData());
    console.log("======Output======");
    
}

initGridAndRun(sampleInput);