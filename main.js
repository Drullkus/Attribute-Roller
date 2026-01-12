const defaultAttributeScores = [15, 14, 13, 12, 10, 8];

const binarySum = (a, b) => a + b;
const binaryDiff = (a, b) => a - b;

class Player {
    constructor(characterName = "Naruto") {
        this.name = characterName;
        this.attributes = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
    }

    rollAttributes() {
        for (const key in this.attributes) {
            let results = diceRoller(4, 6);

            results.sort(binaryDiff); // Sorts values in ascending order
            results.shift(); // Remove first entry; lowest roll dropped

            this.attributes[key] = sumArrayElements(results); // Sum values and assign
        }
    }

    printPlayer() {
        console.log(`NAME: ${this.name}`);
        for (const [key, value] of Object.entries(this.attributes)) {
            console.log(`${key.slice(0, 3).toUpperCase()}: ${value}`);
        }
    }
}

// Fisher-Yates algorithm for randomly sorting an array
// from: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
// adapted to JS and reconfigured to return a new (non-mutated) array
function shuffleArray(targetArray) {
    let shuffled = Array.from(targetArray); // Clones the input array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

function diceRoller(times, sides) {
    let results = [];

    for (let i = 0; i < times; i++) {
        results.push(Math.floor(Math.random() * sides + 1));
    }
    
    return results;
}

function sumArrayElements(array) {
    return array.reduce((a, b) => a + b);
}

const player01 = new Player();
player01.rollAttributes();
player01.printPlayer();

const player02 = new Player('Son Goku');
player02.rollAttributes();
player02.printPlayer();
