module.exports = [
	{ min: 0,      max: 25000,    rate: 1.40, base: 0 },
	{ min: 25000,  max: 130000,   rate: 2.40, base: 350 },
	{ min: 130000, max: 440000,   rate: 5.00, base: 2870 },
	{ min: 440000, max: 550000,   rate: 6.00, base: 18370 },
	{ min: 550000, max: 960000,   rate: 6.00, base: 2870, over: 130000 },
	{ min: 960000, max: Infinity, rate: 5.50, base: 0 },
];
