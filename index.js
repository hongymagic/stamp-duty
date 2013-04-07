var path = require('path');

function filter (value) {
	return function (band) {
		return band.min <= value && value <= band.max;
	};
}

function toFixed (value, precision) {
	if (precision == null) precision = 2;

	var power = Math.pow(10, precision);
	var fixed = (Math.round(value * power) / power).toFixed(precision);
	return parseFloat(fixed);
}

Array.prototype.first = function (filter) {
	var i, length;
	for (i = 0, length = this.length; i < length; i += 1)
		if (filter.call(this, this[i]) === true)
			return this[i];
}


module.exports = function (state, value) {
	if (state == null) state = 'nsw';
	if (value == null) value = 0;

	var bands = require(path.join(__dirname, 'data', state));
	var band = bands.first(filter(value));
	var duty = band.base + (value - (band.over || band.min)) * (band.rate / 100);

	return toFixed(duty);
};
