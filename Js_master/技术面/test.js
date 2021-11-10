const quickSort = (arr) => {
	if (arr.length < 2) return arr;
	const left = [];
	const right = [];
	const midIndex = Math.floor(arr.length / 2);
	const pivot = arr.splice(midIndex, 1)[0]; // 将这个元素从数组中剥离出来作为哨兵元素
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat([pivot], quickSort(right));
};

let test = [
	9.34, 12.33, 97.66, 58.67, 31.12, 79.42, 26.71, 58.51, 21.13, 34.95, 73.38,
	41.73, 84.43, 81.61, 83.87, 69.1, 96.78, 83.88, 41.4, 17.57, 37.34, 14.81,
	43.96, 51.17, 65.18, 19.91, 44.83, 19.77, 17.62, 95.43,
];

console.log("quick", quickSort(test));
