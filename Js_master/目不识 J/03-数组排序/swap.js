/**
 *
 * @param {*} a
 * @param {*} b
 * @param {*} arr
 */
const swap = (a, b, arr) => {
	[arr[a], arr[b]] = [arr[b], arr[a]];
};

module.exports = swap;
