const getUnorder = require("./getUnorder");

const mergeSort = (arr) => {
	const half = Math.floor(arr.length / 2);
	if (arr.length < 2) return arr;
	const left = arr.splice(0, half);
	return merge(mergeSort(left), mergeSort(arr));
};

const merge = (left, right) => {
	const arr = [];
	while (left.length && right.length) {
		if (left[0] < right[0]) {
			arr.push(left.shift());
		} else {
			arr.push(right.shift());
		}
	}
	return [...arr, ...left, ...right];
};

// let arr = getUnorder(20, 100, 0);
// console.log(arr.sort((a, b) => a - b));
// console.log(mergeSort(arr));
// console.log(
// 	JSON.stringify(arr.sort((a, b) => a - b)) === JSON.stringify(mergeSort(arr))
// );
