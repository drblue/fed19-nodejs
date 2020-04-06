/**
 * calc
 */

const circles = require('./modules/circles');
const num = require('./modules/num');

// console.log("Approximation of PI is:");
// console.log(num.round(Math.PI, 5));

let radius = 2;
let area = circles.circleArea(radius);

console.log(`The area of a circle with radius ${radius} is:`);
console.log(area);
console.log();

console.log(`The approx. area of a circle with radius ${radius} is:`);
console.log(num.round(area, 2));
console.log();

radius = 4;
let circumference = circles.circleCircumference(radius);

console.log(`The circumference of a circle with radius ${radius} is:`);
console.log(circumference);
console.log();

console.log(`The approx. circumference of a circle with radius ${radius} is:`);
console.log(num.round(circumference, 4));
console.log();
