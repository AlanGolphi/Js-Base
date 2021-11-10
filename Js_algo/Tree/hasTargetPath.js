const bt = require("./bt");
const hasTargetPath = (root, target) => {
	if (!root) return false;
	if (!root.left && !root.right) {
		return target === root.val;
	}
	return (
		hasTargetPath(root.left, target - root.val) ||
		hasTargetPath(root.right, target - root.val)
	);
};

console.log(hasTargetPath(bt, 7));
console.log(hasTargetPath(bt, 20));
