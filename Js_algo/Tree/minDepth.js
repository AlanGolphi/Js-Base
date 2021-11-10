const bt = require("./bt");
const minDepth = (root) => {
	let level = 0;
	if (!root) return level;
	const queue = [root];
	while (queue.length) {
		level++;
		let len = queue.length;
		while (len--) {
			let node = queue.shift();
			if (!node.left && !node.right) return level;
			node.left && queue.push(node.left);
			node.right && queue.push(node.right);
		}
	}
	return level;
};

console.log(minDepth(bt));
