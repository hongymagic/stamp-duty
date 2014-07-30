// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;

var Bracket = require('./bracket');

//
// Calculate NSW stamp duty for a given price. Assumes no tax-exemptions,
// that should be done prior to calling this function, if at all.
//
// Stamp duty rates were taken from:
// http://www.osr.nsw.gov.au/taxes/transfer-land/about
//
// @param {number} price Purchase price of the property or land.
// @returns {number} Duties payable to the state government, rounded up to
// the nearest integer.
//
module.exports = function (price) {
	var brackets = [
		new Bracket(0, 14000, 0, 1.25),
		new Bracket(14000, 30000, 175, 1.5),
		new Bracket(30000, 80000, 415, 1.75),
		new Bracket(80000, 300000, 1290, 3.5),
		new Bracket(300000, 1000000, 8990, 4.5),
		new Bracket(1000000, 3000000, 40490, 5.5),
		new Bracket(3000000, Infinity, 150490, 7)
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