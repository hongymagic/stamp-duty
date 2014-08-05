var stampduty = require('../lib');
var assert = require('assert');

module.exports = {
	verify: function (state) {
		return function (price, expected) {
			it('should return $' + expected + ' for property priced at $' + price, function () {
				assert.equal(stampduty(state, price), expected);
			});
		};
	}
};

