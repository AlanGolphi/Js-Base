const bt = require("./bt");
const levelOrder = (root) => {
	const res = [];
	if (!root) return res;
	const queue = [root];
	while (queue.length) {
		let len = queue.length;
		let temp = [];
		while (len--) {
			let node = queue.shift();
			temp.push(node.val);
			node.left && queue.push(node.left);
			node.right && queue.push(node.right);
		}
		res.push(temp);
	}
	return res;
};
console.log(levelOrder(bt));
