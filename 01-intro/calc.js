/**
 * calc
 */

const circles = require('./modules/circles');

let radius = 2;
// let area = circleArea(radius);
let area = circles.circleArea(radius);

console.log(`The area of a circle with radius ${radius} is:`);
console.log(area);
console.log();

radius = 4;
let circumference = circles.circleCircumference(radius);

console.log(`The circumference of a circle with radius ${radius} is:`);
console.log(circumference);
console.log();
