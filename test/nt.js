var verify = require('./helpers').verify('nt');

describe('Stamp Duty for NT', function () {
	verify(0, 0);
	verify(30000, 510);
	verify(150000, 3729);
	verify(300000, 10415);
	verify(525000, 25988);

	verify(525001, 25988);
	verify(525050, 25990);
	verify(930000, 46035);

	verify(3000000, 163500);
	verify(3100000, 168950);
	verify(10000000, 545000);
});