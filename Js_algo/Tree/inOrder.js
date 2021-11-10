const bt = require("./bt");
//    1
//  2   3
// 4 5 6 7

// 递归版
// const res = [];
// const inOrder = (root) => {
// 	if (!root) return [];
// 	inOrder(root.left);
// 	res.push(root.val);
// 	inOrder(root.right);
// };
// inOrder(bt);
// console.log(res);

// 非递归版
const inOrder = (root) => {
	const res = [];
	const stack = [];
	let cur = root;
	while (stack.length || cur) {
		while (cur) {
			stack.push(cur);
			cur = cur.left;
		}
		let node = stack.pop();
		res.push(node.val);
		if (node.right) {
			cur = node.right;
		}
	}
	return res;
};
console.log(inOrder(bt));
