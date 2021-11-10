const bt = require("./bt");

function dfs(root) {
	console.log(root.val);
	// root.children.forEach((item) => {
	// 	dfs(item);
	// });
	root.children.forEach(dfs);
}

dfs(bt);
