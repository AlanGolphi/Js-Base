/**
 *
 * @param {*} n 要几位数
 * @returns {[]}
 */
const getOrder = (n) => {
	const res = [];
	let i = 0;
	while (i <= n) {
		res.push(i);
		i++;
	}
	return res;
};

module.exports = getOrder;
