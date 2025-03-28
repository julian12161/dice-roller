const readline = require("readline");
const colors = require("@colors/colors")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function roll(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

const roller = function() {
    rl.question("What dice are you rolling? >", (answer) => {
        let parts = answer.trim().split(/d/i);
        let numDice = Number(parts[0]);
        let dieSize = Number(parts[1]);

        if (isNaN(numDice) || isNaN(dieSize) || numDice <= 0 || dieSize <= 0) {
            console.log("Invalid input. Please enter in the format XdY (e.g., 2d6).");
            return roller();
        }

        const mod = function() {
            rl.question("Is there a modifier? (enter a number or 0) >", (modifier) => {
                let modValue = Number(modifier.trim());

                if (isNaN(modValue)) {
                    console.log("Invalid modifier. Please enter a valid number.");
                    return mod();
                }

                let results = [];
                let numericResults = [];

                for (let i = 0; i < numDice; i++) {
                    let diceRoll = roll(1, dieSize);
                    numericResults.push(diceRoll);

                    if (diceRoll === dieSize) {
                        results.push(colors.blue(diceRoll));
                    } else if (diceRoll === 1) {
                        results.push(colors.red(diceRoll));
                    } else {
                        results.push(diceRoll);
                    }
                }
                let total = numericResults.reduce((sum, num) => sum + num, 0) + modValue;
                if (total - modifier === numDice * dieSize) {
                    console.log(`You rolled a total of ${colors.blue.bold(total + "!")}: (${results})`);
                } else if (total - modifier === numDice * 1) {
                    console.log(`You rolled a total of ${colors.red(total)}: (${results})`);
                } else {
                    console.log(`You rolled a total of ${total}: (${results})`);
                }

                rl.close();
            })
        }

        mod();
    });
}



roller();
