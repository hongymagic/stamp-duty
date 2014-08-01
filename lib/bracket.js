/**
 * Tax bracket object.
 */
function Bracket(min, max, base, rate) {
	this.min = min;
	this.max = max;
	this.base = base;
	this.rate = rate;
}
/**
 * Check if given number is within the range. This check considers the
 * range as a inclusive set i.e., [min, max].
 *
 * Same as number ∈ [min, max].
 *
 * @param   {number} number Number to check.
 * @returns {boolean} True if number is in (inclusive) range, otherwise false.
 */
Bracket.prototype.contains = function (number) {
	return this.min <= number && number <= this.max;
};

/**
 * Check if given number is within the range. This check considers the
 * range as a exclusive set i.e., (min, max).
 *
 * Same as number ∈ (min, max).
 *
 * @param   {number} number Number to check.
 * @returns {boolean} True if number is in (exclusive) range, otherwise false.
 */
Bracket.prototype.within = function (number) {
	return this.min < number && number < this.max;
};

module.exports = Bracket;