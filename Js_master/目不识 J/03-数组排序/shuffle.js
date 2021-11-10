// 将给定的有序数组打乱顺序
const swap = require("./swap");
const getOrder = require("./getOrder");

// Fisher-Yates
// const shuffle = (arr) => {
// 	let len = arr.length;
// 	while (len) {
// 		let index = Math.floor(Math.random() * len--);
// 		swap(len, index, arr);
// 	}
// };

// Random Order
const shuffle = (arr) => {
	const match = arr.map(Math.random);
	return arr.sort((a, b) => match[a] - match[b]);
};

const arr = getOrder(20);
console.log(arr);
shuffle(arr);
console.log(arr);
