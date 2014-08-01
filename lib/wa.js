// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;
//	- Uses Concessional rate - S147 as primary place of residence is assumed;

var Bracket = require('./bracket');

//
// Calculate WA stamp duty for a given price. Assumes no tax-exemptions,
// that should be done prior to calling this function, if at all.
//
// Stamp duty rates were taken from:
// http://www.finance.wa.gov.au/cms/content.aspx?id=2072
//
// @param {number} price Purchase price of the property or land.
// @returns {number} Duties payable to the state government, rounded up to
// the nearest integer.
//
module.exports = function (price) {
	var brackets = [
		new Bracket(0, 100000, 0, 1.5),
		new Bracket(100000, 200000, 1500, 4.39),
		new Bracket(150000, 360000, 3135, 3.8),
		new Bracket(360000, 725000, 11115, 4.75),
		new Bracket(725000, Infinity, 28453, 5.15)
	];

	function part(bracket, price) {
		var over = Math.ceil((price - bracket.min) / 100);
		return bracket.base + (over * bracket.rate);
	}

	var bracket = brackets.filter(function (b) { return b.contains(price); }).shift();
	if (!bracket) {
		throw new Error('Could not find the tax bracket for ' + price);
	}

	var result = Math.ceil(part(bracket, price));
	return result;
};