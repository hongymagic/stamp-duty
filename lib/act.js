// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;

var Bracket = require('./bracket');

//
// Calculate ACT stamp duty for a given price. Assumes no tax-exemptions,
// that should be done prior to calling this function, if at all.
//
// Stamp duty rates were taken from:
// http://www.revenue.act.gov.au/duties-and-taxes/duties/land-and-improvements
//
// @param {number} price Purchase price of the property or land.
// @returns {number} Duties payable to the state government, rounded up to
// the nearest integer.
//
module.exports = function (price) {
	var brackets = [
		new Bracket(0, 0, 0, 0),
		new Bracket(0, 200000, 20, 2),
		new Bracket(200000, 300000, 4000, 3.5),
		new Bracket(300000, 500000, 7500, 4.15),
		new Bracket(500000, 750000, 15800, 5),
		new Bracket(750000, 1000000, 28300, 6.5),
		new Bracket(1000000, 1454999, 44550, 7),
		new Bracket(0, Infinity, 0, 5.25)
	];

	function part(bracket, price) {
		if (0 < price && price <= 200000) {
			return Math.max(20, price * bracket.rate / 100);
		}

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