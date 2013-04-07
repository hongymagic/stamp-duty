module.exports = [
	{ min: 0,       max: 12000,    rate: 1.00, base: 0 },
	{ min: 12000,   max: 30000,    rate: 2.00, base: 120 },
	{ min: 30000,   max: 50000,    rate: 3.00, base: 480 },
	{ min: 50000,   max: 100000,   rate: 3.50, base: 1080 },
	{ min: 100000,  max: 200000,   rate: 4.00, base: 2830 },
	{ min: 200000,  max: 250000,   rate: 4.25, base: 6830 },
	{ min: 250000,  max: 300000,   rate: 4.75, base: 8955 }
	{ min: 300000,  max: 500000,   rate: 5.00, base: 11330 }
	{ min: 500000,  max: Infinity, rate: 5.50, base: 21330 }
];
