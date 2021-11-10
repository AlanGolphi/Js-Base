const getUnorder = require("./getUnorder");

// 获取数组中最大的数
const getBiggest = (arr) => {
	return Math.max.apply(null, arr);
};

const countSort = (arr) => {
	const res = [];
	const maxValue = getBiggest(arr);
	const container = new Array(maxValue + 1); // 建立一个长度 maxValue + 1 的数组
	for (let i = 0; i < arr.length; i++) {
		container[arr[i]] = container[arr[i]] ? container[arr[i]] + 1 : 1;
	}
	for (let i = 0; i <= maxValue; i++) {
		if (container[i]) {
			while (container[i]--) {
				res.push(i);
			}
		}
	}
	return res;
};

// const arr = getUnorder(100, 1000, 0);
// console.log(arr);
// // console.log(arr.sort((a, b) => a - b));
// console.log(
// 	JSON.stringify(arr.sort((a, b) => a - b)) === JSON.stringify(countSort(arr))
// );

// console.time("计时");
// console.log(countSort(arr));
// console.timeEnd("计时");
