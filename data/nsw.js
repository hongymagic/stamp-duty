module.exports = [
	{ min: 0,       max: 14000,    rate: 1.25, base: 0 },
	{ min: 14000,   max: 30000,    rate: 1.50, base: 175 },
	{ min: 30000,   max: 80000,    rate: 1.75, base: 415 },
	{ min: 80000,   max: 300000,   rate: 3.50, base: 1290 },
	{ min: 300000,  max: 1000000,  rate: 4.50, base: 8990 },
	{ min: 1000000, max: 3000000,  rate: 5.50, base: 40490 },
	{ min: 3000000, max: Infinity, rate: 7.00, base: 150490 }
];
