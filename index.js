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

function createGridAndRun (input) {
    const refactoredInput = refactorInput(input);
    console.log(refactoredInput);
}

createGridAndRun(sampleInput);