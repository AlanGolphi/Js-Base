/**
 * 选择排序
 */
const swap = require("./swap");
const getUnorder = require("./getUnorder");
const arr = getUnorder(10, 100, 0);

const selectSort = (arr) => {
	const len = arr.length;
	let minIndex = 0;
	for (let i = 0; i < len; i++) {
		minIndex = i;
		for (let j = i; j < len; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		if (minIndex !== i) {
			swap(i, minIndex, arr);
		}
	}
	return arr;
};
// console.log(arr.sort((a, b) => a - b));
// console.log(selectSort(arr));
// console.log(
// 	JSON.stringify(arr.sort((a, b) => a - b)) === JSON.stringify(selectSort(arr))
// );
