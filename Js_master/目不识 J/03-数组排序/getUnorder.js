/**
 *
 * @param {*} n 多少位
 * @param {*} range 随机数范围
 * @param {*} dec 保留几位小数
 * @returns {[]} res
 * 生成一个包含 n 个 range 范围内整数的数组
 */
const getUnorder = (n, range, dec) => {
	const res = [];
	while (n--) {
		res.push(Number((Math.random() * range).toFixed(dec)));
	}
	return res;
};

module.exports = getUnorder;
