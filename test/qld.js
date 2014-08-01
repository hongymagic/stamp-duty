var verify = require('./helpers').verify('qld');

describe('Stamp Duty for QLD', function () {
	verify(0, 0);
	verify(2500, 25);
	verify(5000, 50);
	verify(5001, 51);
	verify(55000, 550);
	verify(75000, 750);
	verify(75001, 751);
	verify(350000, 3500);

	verify(350001, 3504);
	verify(540000, 10150);

	verify(540001, 10155);
	verify(930000, 27700);
	verify(1000000, 30850);

	verify(1000001, 30856);
	verify(5000000, 260850);
});