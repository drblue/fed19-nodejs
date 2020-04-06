/**
 * circles module
 */

const num = require('./num');
const { PI } = Math;

const circleArea = (r) => r ** 2 * PI;
const circleCircumference = r => 2 * PI * r;

const approxCircleArea = (r, precision) => num.round(circleArea(r), precision);
const approxCircleCircumference = (r, precision) => num.round(circleCircumference(r), precision);

module.exports = {
	circleArea,
	circleCircumference,
	approxCircleArea,
	approxCircleCircumference,
};
