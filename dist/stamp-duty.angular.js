!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.stampduty=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;

var Bracket = _dereq_('./bracket');

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
},{"./bracket":2}],2:[function(_dereq_,module,exports){
/**
 * Tax bracket object.
 */
function Bracket(min, max, base, rate) {
	this.min = min;
	this.max = max;
	this.base = base;
	this.rate = rate;
}
/**
 * Check if given number is within the range. This check considers the
 * range as a inclusive set i.e., [min, max].
 *
 * Same as number ∈ [min, max].
 *
 * @param   {number} number Number to check.
 * @returns {boolean} True if number is in (inclusive) range, otherwise false.
 */
Bracket.prototype.contains = function (number) {
	return this.min <= number && number <= this.max;
};

/**
 * Check if given number is within the range. This check considers the
 * range as a exclusive set i.e., (min, max).
 *
 * Same as number ∈ (min, max).
 *
 * @param   {number} number Number to check.
 * @returns {boolean} True if number is in (exclusive) range, otherwise false.
 */
Bracket.prototype.within = function (number) {
	return this.min < number && number < this.max;
};

module.exports = Bracket;
},{}],3:[function(_dereq_,module,exports){
var states = {
	'nsw': _dereq_('./nsw'),
	'vic': _dereq_('./vic'),
	'wa': _dereq_('./wa'),
	'tas': _dereq_('./tas'),
	'act': _dereq_('./act'),
	'nt': _dereq_('./nt'),
	'sa': _dereq_('./sa'),
	'qld': _dereq_('./qld')
};

/**
 * Australian Stamp Duty calculator.
 *
 * This stamp duty assumes that:
 *  - property being purchased is residential;
 *  - property being purchased is owner-occupied;
 *  - no first home buyer's grants;
 *  - no tax exemptions;
 *  - no concessional rates;
 *  - but some concessional rates where applicable.
 *
 * With the exception of:
 *
 * In WA, concessional rates apply for properties under $200,000 as residents
 * purchainsg a property as their primary place of residence qualify for
 * concessional rates as specified by the S147.
 *
 * @param {string} state Standard abbreviation for Australian States.
 * @param {number} number Total stamp duty required to be paid, rounded up to
 * the nearest integer.
 */
module.exports = function stampduty(state, price) {
	state = state.toLowerCase();

	if (!(state in states)) {
		throw new Error('Invalid state: ' + state);
	}

	if (typeof price !== 'number' || !isFinite(price)) {
		throw new Error('Invalid price: ' + price);
	}

	return states[state](price);
};
},{"./act":1,"./nsw":4,"./nt":5,"./qld":6,"./sa":7,"./tas":8,"./vic":9,"./wa":10}],4:[function(_dereq_,module,exports){
// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;

var Bracket = _dereq_('./bracket');

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
},{"./bracket":2}],5:[function(_dereq_,module,exports){
module.exports = function (price) {
	var V = price / 1000;
	var result = 0;

	if (price < 525000) {
		result = (0.06571441 * Math.pow(V, 2)) + (15 * V);
	} else if (525000 <= price && price < 3000000) {
		result = 4.95 * price / 100;
	} else {
		result = 5.45 * price / 100;
	}
	return Math.ceil(result);
};
},{}],6:[function(_dereq_,module,exports){
// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;
//	- Home concession rates;

var Bracket = _dereq_('./bracket');

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
},{"./bracket":2}],7:[function(_dereq_,module,exports){
// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;
//	- No Off-the-plan apartment concessions;

var Bracket = _dereq_('./bracket');

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
},{"./bracket":2}],8:[function(_dereq_,module,exports){
// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;
//	- No Off-the-plan apartment concessions;

var Bracket = _dereq_('./bracket');

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
},{"./bracket":2}],9:[function(_dereq_,module,exports){
// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;

var Bracket = _dereq_('./bracket');

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
},{"./bracket":2}],10:[function(_dereq_,module,exports){
// Assumptions
//
//	- Primary place of residences;
//	- No first home buyer's grants;
//	- No tax-exemptions of any sort;
//	- Uses Concessional rate - S147 as primary place of residence is assumed;

var Bracket = _dereq_('./bracket');

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
},{"./bracket":2}]},{},[3])
(3)
});
/* global angular */
angular
.module('stampduty', [])
.factory('stampduty', ['$window', function ($window) {
	return $window.stampduty;
}]);
