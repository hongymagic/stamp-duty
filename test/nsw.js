var test = require('tap').test;
var calc = require('../index');

test('make sure numbers are correct', function (t) {
	function verify (value, expected) {
		var name = '$' + value + ' should equal $' + expected;
		test(name, function (t) {
			t.plan(1);
			t.equal(calc('nsw', value), expected, name);
		});
	}

	verify(0, 0);
	verify(15000, 190);
	verify(25000, 340);
	verify(25001, 340.02);
	verify(650000, 24740);

	t.end();
});