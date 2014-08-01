var stampduty = require('../lib');

module.exports = {
	verify: function (state) {
		return function (price, expected) {
			it('should return $' + expected + ' for property priced at $' + price, function () {
				expect(stampduty(state, price)).toEqual(expected);
			});
		}
	}
};

