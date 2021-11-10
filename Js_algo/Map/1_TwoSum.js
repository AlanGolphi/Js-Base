/*
 * @Author: AlanGolphi
 * @Date: 2021-06-07 20:16:14
 * @LastEditTime: 2021-06-08 14:48:18
 */
// 两数之和，给一个数组和一个target，返回数组内和为target的两个值的下标
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

var twoSum = function (nums, target) {
	const cache = new Map();
	for (let i = 0; i < nums.length; i++) {
		const cur = nums[i];
		const dif = target - cur;
		if (cache.has(dif)) {
			return [cache.get(dif), i];
		} else {
			cache.set(cur, i);
		}
	}
};
