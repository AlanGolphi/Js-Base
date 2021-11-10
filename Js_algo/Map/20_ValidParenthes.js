/*
 * @Author: AlanGolphi
 * @Date: 2021-06-07 19:39:56
 * @LastEditTime: 2021-06-07 19:50:11
 */
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

//利用Map优化有效括号

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
	if (s.length % 2 == 1) return false;
	const stack = [];
	const judge = new Map();
	judge.set("(", ")");
	judge.set("[", "]");
	judge.set("{", "}");

	for (let i = 0; i < s.length; i++) {
		const cur = s[i];
		if (judge.get(cur)) {
			stack.push(cur);
		} else {
			const tar = stack.pop(stack.length - 1);
			if (cur !== judge.get(tar)) {
				return false;
			}
		}
	}
	return stack.length == 0;
};
