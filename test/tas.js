var verify = require('./helpers').verify('tas');

describe('Stamp Duty for TAS', function () {
	verify(0, 0);
	verify(1300, 50);
	verify(1301, 50);
	verify(3000, 50);

	verify(3001, 52);
	verify(23000, 400);
	verify(25000, 435);

	verify(25001, 438);
	verify(60000, 1223);
	verify(75000, 1560);

	verify(75001, 1564);
	verify(125232, 3321);
	verify(200000, 5935);

	verify(200001, 5939);
	verify(300000, 9935);
	verify(375000, 12935);

	verify(375001, 12940);
	verify(550333, 20390);
	verify(725000, 27810);

	verify(725001, 27815);
	verify(5000000, 220185);
	verify(25000000, 1120185);
});