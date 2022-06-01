// 1. Fetch input from txt file
// 2. Refactor data for usability
// 3. Init grid using input data
// 4. Init robots and run
// 5. Store robot location data
// 6. Output data as string to terminal

const fs = require('fs');

let sampleInput = '';

try {
    const data = fs.readFileSync('./sampleInput.txt', 'utf8');
    sampleInput = data.toString();
} catch (err) {
    throw new Error(err);
}

const refactorInput = (input) => {
    // Get grid bondaries
    let gridLayout = input.substr(0, input.indexOf('\n')).split(' ');
    
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

const createRobot = ({start=[0,0], orientation='N', cmd}) => {
    return {
        x: Number(start[0]),
        y: Number(start[1]),
        compass: ['N', 'E', 'S', 'W'],
        cmd,
        orientation,
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
            switch(this.orientation) {
                case 'N':
                    this.y += 1;
                    break;
                case 'E':
                    this.x += 1;
                    break;
                case 'S':
                    this.y -= 1;
                    break;
                case 'W':
                    this.x -= 1;
                    break;
            }
        },
        moveRobot() {
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
                orientation: this.orientation
            }
        }
    }
}

const createGrid = (input) => {

    function setBounds(gridLayout) {
        return {
            min: {x: 0, y: 0},
            max: {x: Number(gridLayout[0]), y: Number(gridLayout[1])}
        }
    }

    return {
        robotCmds: input.robotCmds,
        results: [],
        bounds: setBounds(input.gridLayout),
        runRobots() {

            // Init robots
            this.robotCmds.forEach((robotInfo) => {
                const robot = createRobot(robotInfo);
                // Move each robot
                robot.moveRobot();
                // Push end result to this.results
                this.results.push(robot.outputData())
            });

        },
        outputAllData() {
            console.log(this.results);
        }
    }
}

function initGridAndRun (input) {
    const refactoredInput = refactorInput(input);
    const grid = createGrid(refactoredInput);
    
    grid.runRobots();

    grid.outputAllData();
}

initGridAndRun(sampleInput);