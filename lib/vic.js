// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;

var Bracket = require('./bracket');

//
// Calculate VIC stamp duty for a given price. Assumes no tax-exemptions,
// that should be done prior to calling this function, if at all.
//
// Stamp duty rates were taken from:
// http://www.sro.vic.gov.au/SRO/sronav.nsf/childdocs/-34FAD0EFBAFF8BE0CA2575A100442101-E35A67FBAB847FF1CA2575D10080A69F-1F4F15D2B7E31144CA2576EE007AFC77-33F164285C8F118CCA2576EE007E3927?open
// http://www.sro.vic.gov.au/sro/SROnav.nsf/LinkView/79D592C55BA68039CA2576EE007FECB31F4F15D2B7E31144CA2576EE007AFC77
//
// @param {number} price Purchase price of the property or land.
// @returns {number} Duties payable to the state government, rounded up to
// the nearest integer.
//
module.exports = function (price) {
	var brackets = [
		new Bracket(0, 25000, 0, 1.4),
		new Bracket(25001, 130000, 350, 2.4),
		new Bracket(130001, 440000, 2870, 5),
		new Bracket(440001, 550000, 18370, 6),
		new Bracket(130001, 960000, 2870, 6),
		new Bracket(0, Infinity, 0, 5.5)
	];

	function percentage(bracket, price) {
		var over = price - bracket.min;
		return Math.round(bracket.base + (over * bracket.rate / 100));
	}

	var bracket = brackets.filter(function (b) { return b.contains(price); }).shift();
	if (!bracket) {
		throw new Error('Could not find the tax bracket for ' + price);
	}

	var result = Math.ceil(percentage(bracket, price));
	return result;
};