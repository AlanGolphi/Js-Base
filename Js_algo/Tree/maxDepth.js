const bt = require("./bt");
const maxDepth = (root) => {
	let level = 0;
	if (!root) return level;
	const queue = [root];
	while (queue.length) {
		let len = queue.length;
		while (len--) {
			let node = queue.shift();
			node.left && queue.push(node.left);
			node.right && queue.push(node.right);
		}
		level++;
	}
	return level;
};
console.log(maxDepth(bt));
