var verify = require('./helpers').verify('wa');

describe('Stamp Duty for WA', function () {
	verify(0, 0);
	verify(40000, 600);
	verify(80000, 1200);

	verify(80001, 1202);
	verify(90000, 1350);
	verify(100000, 1500);

	verify(100001, 1505);
	verify(150000, 3695);
	verify(200000, 5890);

	verify(200001, 5039);
	verify(250000, 6935);
	verify(360000, 11115);

	verify(360001, 11120);
	verify(550000, 20140);
	verify(725000, 28453);

	verify(725001, 28459);
	verify(930000, 39011);
	verify(1930000, 90511);
});