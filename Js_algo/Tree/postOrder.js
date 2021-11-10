const bt = require("./bt");
//    1
//  2   3
// 4 5 6 7

// 递归版
// const res = [];
// const postOrder = (root) => {
// 	if (!root) return [];
// 	postOrder(root.left);
// 	postOrder(root.right);
// 	res.push(root.val);
// };
// postOrder(bt);
// console.log(res);

// 非递归版
const postOrder = (root) => {
	const res = [];
	const stack1 = [];
	const stack2 = [];
	root && stack1.push(root);
	while (stack1.length) {
		let node = stack1.pop();
		stack2.push(node.val);
		node.left && stack1.push(node.left);
		node.right && stack1.push(node.right);
	}
	while (stack2.length) {
		res.push(stack2.pop());
	}
	return res;
};
console.log(postOrder(bt));
