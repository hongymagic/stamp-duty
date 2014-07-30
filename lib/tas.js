// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;
//	- No Off-the-plan apartment concessions;

var Bracket = require('./bracket');

//
// Calculate TAS stamp duty for a given price. Assumes no tax-exemptions,
// that should be done prior to calling this function, if at all.
//
// Stamp duty rates were taken from:
// http://www.sro.tas.gov.au/domino/dtf/SROWebsite.nsf/v-all/4829E8B44ABC1076CA25793300034073?OpenDocument&menuitem=Property%20Buyers
//
// @param {number} price Purchase price of the property or land.
// @returns {number} Duties payable to the state government, rounded up to
// the nearest integer.
//
module.exports = function (price) {
	var brackets = [
		new Bracket(0, 1, 0, 0),
		new Bracket(1, 3000, 50, 0),
		new Bracket(3000, 25000, 50, 1.75),
		new Bracket(25000, 75000, 435, 2.25),
		new Bracket(75000, 200000, 1560, 3.5),
		new Bracket(200000, 375000, 5935, 4),
		new Bracket(375000, 725000, 12935, 4.25),
		new Bracket(725000, Infinity, 27810, 4.5)
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