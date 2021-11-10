/**
 * 冒泡排序
 */
const swap = require("./swap");
const getUnorder = require("./getUnorder");

const bubbleSort = (arr) => {
	// 添加交换标识，如果为 false ，表示为有序，提前退出冒泡
	let flag = false;
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				swap(j, j + 1, arr);
				flag = true;
			}
		}
		if (!flag) break;
	}
	return arr;
};

// const arr = getUnorder(10000, 1000, 0);
// // console.log(arr.sort((a, b) => a - b));
// console.log(
// 	JSON.stringify(arr.sort((a, b) => a - b)) === JSON.stringify(bubbleSort(arr))
// );

// console.time("计时");
// console.log(bubbleSort(arr));
// console.timeEnd("计时");
