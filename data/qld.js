module.exports = [
	{ min: 0,       max: 5000,     rate: 0.00, base: 0 },
	{ min: 5000,    max: 105000,   rate: 1.50, base: 0, over: 5000 },
	{ min: 105000,  max: 480000,   rate: 3.50, base: 1500 },
	{ min: 480000,  max: 980000,   rate: 4.50, base: 14625 },
	{ min: 980000,  max: Infinity, rate: 5.25, base: 37125 }
];
