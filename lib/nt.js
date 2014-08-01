module.exports = function (price) {
	var V = price / 1000;
	var result = 0;

	if (price < 525000) {
		result = (0.06571441 * Math.pow(V, 2)) + (15 * V);
	} else if (525000 <= price && price < 3000000) {
		result = 4.95 * price / 100;
	} else {
		result = 5.45 * price / 100;
	}
	return Math.ceil(result);
};