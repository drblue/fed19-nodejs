/**
 * all things numeric
 */

const round = (num, decimals) => Math.round(num * 10 ** decimals) / 10 ** decimals;

module.exports = {
	round,
};
