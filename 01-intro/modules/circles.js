/**
 * circles module
 */

const { PI } = Math;

const circleArea = (r) => r ** 2 * PI;
const circleCircumference = r => 2 * PI * r;

module.exports = {
	circleArea,
	circleCircumference,
};
