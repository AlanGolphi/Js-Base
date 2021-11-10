/*
 * @Author: AlanGolphi
 * @Date: 2021-06-05 21:17:54
 * @LastEditTime: 2021-06-05 21:23:14
 */
// 给定两个数组，编写一个函数来计算它们的交集。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
	const set1 = new Set(nums1);
	const set2 = new Set(nums2);
	return [...set1].filter((item) => set2.has(item));
};
// 将两个数组变成Set，再用filter方法求交集包含的元素

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
  var i ntersection = function (nums1, nums2) {
	return [...new Set(nums1)].filter(item => nums2.includes(item));
};
// 也可以调用数组的includes方法，不用再次将nums2转为Set，减少时间复杂度
