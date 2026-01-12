const defaultAttributeScores = [15, 14, 13, 12, 10, 8];
const attributeNames = [ "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma" ];

const binarySum = (a, b) => a + b;
const binaryDiff = (a, b) => a - b;
const attributeEntryFormatter = ([key, value]) => `${key.slice(0, 3).toUpperCase()}: ${value}`;
// Create 0..(N-1) arrays using .from({length}, map) https://stackoverflow.com/a/33352604
const diceRoller = (times, sides) => Array.from({length: times}, () => Math.floor(Math.random() * sides + 1));
const sumArrayElements = (array) => array.reduce(binarySum);

// Returns an array of dice rolls, best three out of four
function lenient3d6() {
    return diceRoller(4, 6)
        .sort(binaryDiff) // Sorts values in ascending order
        .slice(1); // Remove first entry; lowest roll dropped
}

class Player {
    constructor(characterName = "Naruto") {
        this.name = characterName;

        const shuffledScores = shuffleArray(defaultAttributeScores);
        // Array with inner listed key-val pairs, for example [["strength", 10], ["dexerity", 11], ...]
        const attributeArrays = attributeNames.map((name, index) => [name, shuffledScores[index]]);
        // Object.fromEntries from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
        // Converts listed key-val pairs into map object
        this.attributes = Object.fromEntries(attributeArrays);
    }

    rollAttributes() {
        // Similar as to last two lines of code in constructor, but with new rolls
        const attributeArrays = attributeNames.map((name) => [name, sumArrayElements(lenient3d6())]);
        this.attributes = Object.fromEntries(attributeArrays);
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
    const shuffled = Array.from(targetArray); // Clones the input array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Assign two values at once as structure+destructure assignment https://stackoverflow.com/a/12646864
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const player01 = new Player();
// Attributes are shuffle-copied from defaults
player01.printPlayer();

const player02 = new Player('Son Goku');
player02.rollAttributes();
player02.printPlayer();
