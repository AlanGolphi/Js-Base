const bt = require("./bt");
//    1
//  2   3
// 4 5 6 7

// 递归版
const res = [];
// const preOrder = (root) => {
// 	if (!root) return [];
// 	res.push(root.val);
// 	preOrder(root.left);
// 	preOrder(root.right);
// };
// preOrder(bt);
// console.log(res);

// 非递归版
const preOrder = (root) => {
	const res = [];
	const stack = [];
	root && stack.push(root);
	while (stack.length) {
		let cur = stack.pop();
		res.push(cur.val);
		cur.right && stack.push(cur.right);
		cur.left && stack.push(cur.left);
	}
	return res;
};
console.log(preOrder(bt));
