var verify = require('./helpers').verify('nsw');

describe('Stamp Duty for NSW', function () {
	verify(0, 0);
	verify(14000, 175);

	verify(14001, 177);
	verify(23000, 310);
	verify(30000, 415);

	verify(30001, 417);
	verify(55000, 853);
	verify(80000, 1290);

	verify(80001, 1294);
	verify(250000, 7240);
	verify(300000, 8990);

	verify(300001, 8995);
	verify(930000, 37340);
	verify(1000000, 40490);

	verify(1000001, 40496);
	verify(2000000, 95490);
	verify(3000000, 150490);

	verify(3000001, 150497);
	verify(5000000, 290490);
	verify(25000000, 1690490);
});