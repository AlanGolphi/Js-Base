const getUnorder = require("./getUnorder");
const arr = getUnorder(10, 100, 0);

const insertSort = (arr) => {
	if (arr.length < 2) return arr;
	for (let i = 0; i < arr.length; i++) {
		const val = arr[i];
		let j = i - 1;
		for (j; j >= 0; j--) {
			if (arr[j] > val) {
				arr[j + 1] = arr[j];
			} else break;
		}
		arr[j + 1] = val;
	}
	return arr;
};

// console.time("insertSort");
// console.log(insertSort(arr));
// console.timeEnd("insertSort");
