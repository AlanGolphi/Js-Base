const getUnorder = require("./getUnorder");

const swap = require("./swap");

const arr = getUnorder(30, 100, 0);

// const partion = (arr, left, right) => {
// 	const pivot = arr[Math.floor((left + right) / 2)];
// 	while (left <= right) {
// 		while (arr[left] < pivot) {
// 			left++;
// 		}
// 		while (arr[right] > pivot) {
// 			right--;
// 		}
// 		if (left <= right) {
// 			swap(left, right, arr);
// 			left++;
// 			right--;
// 		}
// 	}
// 	return left;
// };

// const quickSort = (arr, left = 0, right = arr.length - 1) => {
// 	if (arr.length > 1) {
// 		let index = partion(arr, left, right);
// 		if (left < index - 1) {
// 			quickSort(arr, left, index - 1);
// 		}
// 		if (right > index) {
// 			quickSort(arr, index, right);
// 		}
// 	}
// 	return arr;
// };

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

// const quickSort = (arr) => {
// 	if (arr.length < 2) return arr;
// 	const mid = Math.floor(arr.length / 2);
// 	const pivot = arr.splice(mid, 1)[0];
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

console.log("init", arr);
console.log("quick", quickSort(arr));
