var verify = require('./helpers').verify('vic');

describe('Stamp Duty for VIC', function () {
	verify(0, 0);
	verify(14000, 196);

	verify(14001, 196);
	verify(23000, 322);
	verify(25000, 350);

	verify(30001, 470);
	verify(55000, 1070);
	verify(80000, 1670);

	verify(80001, 1670);
	verify(130000, 2870);
	verify(130001, 2870);
	verify(250000, 8870);
	verify(300000, 11370);
	verify(300001, 11370);
	verify(440000, 18370);

	verify(930000, 50870);
	verify(1000000, 55000);

	verify(1000001, 55000);
	verify(2000000, 110000);
	verify(3000000, 165000);

	verify(3000001, 165000);
	verify(5000000, 275000);
	verify(25000000, 1375000);
});