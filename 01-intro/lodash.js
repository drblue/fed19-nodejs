/**
 * lodash
 */

const _ = require('lodash');

// _.now
console.log("Time is now: ");
console.log(_.now());
console.log();

// _.shuffle
const fibonacci_points = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
console.log("Shuffled fibonacci points:");
console.log(_.shuffle(fibonacci_points));
console.log();

// _.round
console.log("The approx. of 🥧 is:");
console.log(_.round(Math.PI, 4));
console.log();

// _.sum
console.log("The sum of all fibonacci points are:");
console.log(_.sum(fibonacci_points));
console.log();
