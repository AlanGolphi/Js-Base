const bt = require("./bt");
const allPath = (root) => {
	const res = [];
	const getPath = (node, curPath) => {
		if (!node.left && !node.right) {
			curPath += node.val;
			res.push(curPath);
		}
		curPath += node.val + "->";
		node.left && getPath(node.left, curPath);
		node.right && getPath(node.right, curPath);
	};
	getPath(root, "");
	return res;
};
console.log(allPath(bt));
