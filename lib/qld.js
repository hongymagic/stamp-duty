// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;
//	- Home concession rates;

var Bracket = require('./bracket');

//
// Calculate QLD stamp duty for a given price. Assumes no tax-exemptions,
// that should be done prior to calling this function, if at all.
//
// Stamp duty rates were taken from:
// https://www.osr.qld.gov.au/duties/about-duties/rates-of-duty.shtml
// https://www.osr.qld.gov.au/duties/transfer-duty/exemptions-and-concessions/home-transfer-duty-concession-rates.shtml?showtab=3
//
// @param {number} price Purchase price of the property or land.
// @returns {number} Duties payable to the state government, rounded up to
// the nearest integer.
//
module.exports = function (price) {
	var brackets = [
		new Bracket(0, 350000, 0, 1),
		new Bracket(350000, 540000, 3500, 3.5),
		new Bracket(540000, 1000000, 10150, 4.5),
		new Bracket(1000000, Infinity, 30850, 5.75)
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