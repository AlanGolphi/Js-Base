/*
 * @Author: AlanGolphi
 * @Date: 2021-06-02 17:52:57
 * @LastEditTime: 2021-06-02 18:06:19
 */
//有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

if (s.length % 2 === 1) return false;
const stack = [];
for (let i = 0; i < s.length; i++) {
	if (s[i] === "(" || s[i] === "[" || s[i] === "{") stack.push(s[i]);
	if (s[i] === ")" && stack.pop() !== "(") return false;
	if (s[i] === "]" && stack.pop() !== "[") return false;
	if (s[i] === "}" && stack.pop() !== "{") return false;
}
return stack.length === 0;
