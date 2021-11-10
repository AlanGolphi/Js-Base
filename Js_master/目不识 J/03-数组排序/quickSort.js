const swap = require("./swap");
const getUnorder = require("./getUnorder");

// 抽象原地交换版
const quickSort = (arr, start = 0, end = arr.length - 1) => {
	if (start >= end) return;
	let i = start;
	let j = end;
	const pivot = arr[i];
	while (i <= j) {
		while (arr[i] < pivot) {
			i++;
		}
		while (arr[j] > pivot) {
			j--;
		}
		if (i <= j) {
			swap(i, j, arr);
			i++;
			j--;
		}
	}
	quickSort(arr, start, i - 1);
	quickSort(arr, i, end);
	return arr;
};

// 具象额外空间版
// const quickSort = (arr) => {
// 	if (arr.length < 2) return arr;
// 	const pivotIndex = Math.floor(arr.length / 2);
// 	const pivot = arr.splice(pivotIndex, 1)[0];
// 	const left = [];
// 	const right = [];
// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr[i] < pivot) {
// 			left.push(arr[i]);
// 		} else {
// 			right.push(arr[i]);
// 		}
// 	}
// 	return quickSort(left).concat([pivot], quickSort(right));
// };

const arr = getUnorder(20, 100, 2);
console.log("init", arr);
console.log("quick", quickSort(arr));

module.exports = quickSort;
