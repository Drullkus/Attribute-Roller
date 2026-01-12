const defaultAttributeScores = [15, 14, 13, 12, 10, 8];

const binarySum = (a, b) => a + b;
const binaryDiff = (a, b) => a - b;
const attributeEntryFormatter = ([key, value]) => `${key.slice(0, 3).toUpperCase()}: ${value}`;
// Create 0..(N-1) arrays using .from({length}, map) https://stackoverflow.com/a/33352604
const diceRoller = (times, sides) => Array.from({length: times}, () => Math.floor(Math.random() * sides + 1));
const sumArrayElements = (array) => array.reduce(binarySum);

function lenient4d6() {
    return diceRoller(4, 6)
        .sort(binaryDiff) // Sorts values in ascending order
        .filter((_value, index) => index != 0); // Remove first entry; lowest roll dropped
}

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
        let shuffledResult = shuffleArray(defaultAttributeScores);
        for (const [key, value] of Object.entries(this.attributes)) {
            let attributeValue = shuffledResult.pop();
            this.attributes[key] = attributeValue;
        }
    }

    rollAttributes() {
        for (const key in this.attributes) {
            this.attributes[key] = sumArrayElements(lenient4d6()); // Sum values and assign
        }
    }

    printPlayer() {
        console.log(`NAME: ${this.name}`);
        Object.entries(this.attributes)
            .map(attributeEntryFormatter)
            .forEach((line) => console.log(line)); // Cannot directly pass console.log, must discard second and third lambda args
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

const player01 = new Player();
player01.printPlayer();

const player02 = new Player('Son Goku');
player02.rollAttributes();
player02.printPlayer();
