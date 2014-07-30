var verify = require('./helpers').verify('sa');

describe('Stamp Duty for SA', function () {
	verify(0, 0);
	verify(10000, 100);
	verify(10023, 101);
	verify(12000, 120);

	verify(12001, 122);
	verify(18387, 248);
	verify(29384, 468);
	verify(30000, 480);

	verify(30001, 483);
	verify(33971, 600);
	verify(50000, 1080);

	verify(50001, 1084);
	verify(75000, 1955);
	verify(88888, 2442);
	verify(100000, 2830);

	verify(100001, 2834);
	verify(123456, 3770);
	verify(200000, 6830);

	verify(200001, 6835);
	verify(222222, 7778);
	verify(250000, 8955);

	verify(250001, 8960);
	verify(277777, 10276);
	verify(300000, 11330);

	verify(300001, 11335);
	verify(400000, 16330);
	verify(488888, 20775);
	verify(500000, 21330);

	verify(500001, 21336);
	verify(1500000, 76330);
	verify(25000000, 1368830);
});