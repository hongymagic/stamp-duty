var verify = require('./helpers').verify('act');

describe('Stamp Duty for ACT', function () {
	verify(0, 0);
	verify(100000, 2000);
	verify(177777, 3556);
	verify(200000, 4000);

	verify(200001, 4004);
	verify(250000, 5750);
	verify(300000, 7500);

	verify(300001, 7505);
	verify(400000, 11650);
	verify(500000, 15800);

	verify(500001, 15805);
	verify(606666, 21135);
	verify(750000, 28300);

	verify(750001, 28307);
	verify(888888, 37329);
	verify(1000000, 44550);

	verify(1000001, 44557);
	verify(1454999, 76400);

	verify(1455000, 76388);
	verify(5000000, 262500);
	verify(25000000, 1312500);
});