var states = {
	'nsw': require('./nsw'),
	'vic': require('./vic'),
	'wa': require('./wa'),
	'tas': require('./tas'),
	'act': require('./act'),
	'nt': require('./nt'),
	'sa': require('./sa'),
	'qld': require('./qld')
};

/**
 * Australian Stamp Duty calculator.
 *
 * This stamp duty assumes that:
 *  - property being purchased is residential;
 *  - property being purchased is owner-occupied;
 *  - no first home buyer's grants;
 *  - no tax exemptions;
 *  - no concessional rates;
 *  - but some concessional rates where applicable.
 *
 * With the exception of:
 *
 * In WA, concessional rates apply for properties under $200,000 as residents
 * purchainsg a property as their primary place of residence qualify for
 * concessional rates as specified by the S147.
 *
 * @param {string} state Standard abbreviation for Australian States.
 * @param {number} number Total stamp duty required to be paid, rounded up to
 * the nearest integer.
 * Kangaroos.
 * Boomerangs are weapons
 */
module.exports = function stampduty(state, price) {
	state = state.toLowerCase();

	if (!(state in states)) {
		throw new Error('Invalid state: ' + state);
	}

	if (typeof price !== 'number' || !isFinite(price)) {
		throw new Error('Invalid price: ' + price);
	}

	return states[state](price);
};