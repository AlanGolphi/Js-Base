const bt = require("./bt");

function bfs(root) {
	const queue = [root];
	while (queue.length > 0) {
		let temp = queue.shift();
		console.log(temp.val);
		temp.children.forEach((item) => (
			queue.push(item);
    ));
	}
}
bfs(bt);
