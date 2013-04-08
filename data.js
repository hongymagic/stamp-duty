module.exports = {
	nsw: [
		{ min: 0,       max: 14000,    rate: 1.25, base: 0 },
		{ min: 14000,   max: 30000,    rate: 1.50, base: 175 },
		{ min: 30000,   max: 80000,    rate: 1.75, base: 415 },
		{ min: 80000,   max: 300000,   rate: 3.50, base: 1290 },
		{ min: 300000,  max: 1000000,  rate: 4.50, base: 8990 },
		{ min: 1000000, max: 3000000,  rate: 5.50, base: 40490 },
		{ min: 3000000, max: Infinity, rate: 7.00, base: 150490 }
	],

	qld: [
		{ min: 0,       max: 5000,     rate: 0.00, base: 0 },
		{ min: 5000,    max: 105000,   rate: 1.50, base: 0, over: 5000 },
		{ min: 105000,  max: 480000,   rate: 3.50, base: 1500 },
		{ min: 480000,  max: 980000,   rate: 4.50, base: 14625 },
		{ min: 980000,  max: Infinity, rate: 5.25, base: 37125 }
	],

	sa: [
		{ min: 0,       max: 12000,    rate: 1.00, base: 0 },
		{ min: 12000,   max: 30000,    rate: 2.00, base: 120 },
		{ min: 30000,   max: 50000,    rate: 3.00, base: 480 },
		{ min: 50000,   max: 100000,   rate: 3.50, base: 1080 },
		{ min: 100000,  max: 200000,   rate: 4.00, base: 2830 },
		{ min: 200000,  max: 250000,   rate: 4.25, base: 6830 },
		{ min: 250000,  max: 300000,   rate: 4.75, base: 8955 },
		{ min: 300000,  max: 500000,   rate: 5.00, base: 11330 },
		{ min: 500000,  max: Infinity, rate: 5.50, base: 21330 }
	],

	vic: [
		{ min: 0,      max: 25000,    rate: 1.40, base: 0 },
		{ min: 25000,  max: 130000,   rate: 2.40, base: 350 },
		{ min: 130000, max: 440000,   rate: 5.00, base: 2870 },
		{ min: 440000, max: 550000,   rate: 6.00, base: 18370 },
		{ min: 550000, max: 960000,   rate: 6.00, base: 2870, over: 130000 },
		{ min: 960000, max: Infinity, rate: 5.50, base: 0 }
	],

	wa: [
		{ min: 0,       max: 120000,   rate: 1.90, base: 0 },
		{ min: 120000,  max: 150000,   rate: 2.85, base: 2280 },
		{ min: 150000,  max: 360000,   rate: 3.80, base: 3135 },
		{ min: 360000,  max: 300000,   rate: 4.75, base: 11115 },
		{ min: 725000,  max: Infinity, rate: 5.15, base: 28435 }
	]
};