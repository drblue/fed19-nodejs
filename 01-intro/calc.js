/**
 * calc
 */

const circles = require('./modules/circles');

let radius = 2;
let area = circles.approxCircleArea(radius, 4);

console.log(`The approx. area of a circle with radius ${radius} is:`);
console.log(area);
console.log();

radius = 4;
let circumference = circles.approxCircleCircumference(radius, 2);

console.log(`The approx. circumference of a circle with radius ${radius} is:`);
console.log(circumference);
console.log();
