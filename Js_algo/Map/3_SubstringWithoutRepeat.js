/*
 * @Author: AlanGolphi
 * @Date: 2021-06-08 15:18:33
 * @LastEditTime: 2021-06-08 15:28:30
 */
// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	let left = 0;
	let res = 0;
	let record = new Map();
	for (let right = 0; right < s.length; right++) {
		if (record.has(s[right]) && record.get(s[right]) >= left) {
			left = record.get(s[right]) + 1;
		}
		record.set(s[right], right);
		res = Math.max(res, right - left + 1);
	}
	return res;
};

// 左右双指针滑动窗口，当没遇到相同数的时候右指针一直向右，并且不断将数以及下标加到Map中
// 当遇到相同数，且这个数在窗口内，移动左指针到右指针+1，更新res
