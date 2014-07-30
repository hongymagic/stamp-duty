// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;
//	- No Off-the-plan apartment concessions;

var Bracket = require('./bracket');

//
// Calculate SA stamp duty for a given price. Assumes no tax-exemptions,
// that should be done prior to calling this function, if at all.
//
// Stamp duty rates were taken from:
// http://www.revenuesa.sa.gov.au/taxes-and-duties/stamp-duties/real-property-land
//
// @param {number} price Purchase price of the property or land.
// @returns {number} Duties payable to the state government, rounded up to
// the nearest integer.
//
module.exports = function (price) {
	var brackets = [
		new Bracket(0, 12000, 0, 1),
		new Bracket(12000, 30000, 120, 2),
		new Bracket(30000, 50000, 480, 3),
		new Bracket(50000, 100000, 1080, 3.5),
		new Bracket(100000, 200000, 2830, 4),
		new Bracket(200000, 250000, 6830, 4.25),
		new Bracket(250000, 300000, 8955, 4.75),
		new Bracket(300000, 500000, 11330, 5),
		new Bracket(500000, Infinity, 21330, 5.5)
	];

	function part(bracket, price) {
		var over = Math.ceil((price - bracket.min) / 100);
		return Math.ceil(bracket.base + (over * bracket.rate));
	}

	var bracket = brackets.filter(function (b) { return b.contains(price); }).shift();
	if (!bracket) {
		throw new Error('Could not find the tax bracket for ' + price);
	}

	var result = Math.ceil(part(bracket, price));
	return result;
};